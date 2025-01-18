"use server";

import { auth, signIn, signOut } from "./auth";
import supabase from "./services/supabase";
import { revalidatePath } from "next/cache";
import { uploadNewsSchemaServer } from "./validation";
import { ZodError } from "zod";
import { getNewsWithCategoriesAndSubcategories } from "./services/data-service";
import { redirect } from "next/navigation";

const supabaseUrl = process.env.SUPABASE_URL as string;

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createNew(formData: FormData): Promise<{
  success: boolean;
  error?: string;
  validationErrors?: Record<string, string>;
}> {
  try {
    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());
    const images = formData.getAll("image") as File[];

    // Validate with Zod
    const validatedData = uploadNewsSchemaServer.parse({
      ...data,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      userId: data.userId,
      image: images,
    });

    // Use validatedData for further processing
    const {
      title,
      categoryId,
      subCategoryId,
      content,
      selectedAddress,
      userId,
      image,
    } = validatedData;

    const address = JSON.parse(selectedAddress);
    const { street, state, country, latitude, longitude, number, city } = address;
    const fullStreet = `${street} ${number}`;

    const newsData = {
      newsTitle: title,
      newsDescription: content,
      categoryId,
      subCategoryId,
      street: fullStreet,
      city,
      state,
      country,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      userId,
      upVotes: 0,
      downVotes: 0,
      votesScore: 0,
    };

    // Insert into the `news` table
    const { data: news, error: newsError } = await supabase
      .from("news")
      .insert([newsData])
      .select("newsId")
      .single();

    if (newsError || !news) {
      throw new Error(newsError?.message || "Failed to insert news.");
    }

    const newsId = news.newsId;

    for (const imageFile of image) {
      const fileName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");

      const { error: storageError } = await supabase.storage
        .from("pictures")
        .upload(fileName, imageFile);

      if (storageError) {
        console.error("Failed to upload image:", storageError.message);
        continue;
      }

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/pictures/${fileName}`;

      const mediaData = {
        newsId,
        url: imageUrl,
        type: imageFile.type,
        createdAt: new Date().toISOString(),
      };

      const { error: mediaError } = await supabase.from("media_table").insert([mediaData]);

      if (mediaError) {
        console.error("Failed to save media data:", mediaError.message);
      }
    }

    revalidatePath("/account/upload");
    
    return { success: true };
  } catch (err) {
    if (err instanceof ZodError) {
      const validationErrors = err.errors.reduce((acc, error) => {
        if (error.path.length > 0) {
          acc[error.path[0]] = error.message;
        }
        return acc;
      }, {} as Record<string, string>);

      return { success: false, validationErrors };
    }

    console.error("Unexpected Error:", err);
    return { success: false, error: (err as Error).message };
  }
}

export async function deleteNew(newId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const appNews = await getNewsWithCategoriesAndSubcategories(Number(session?.user?.id));
  const gappNewIds = appNews.map((news) => news.newsId);

  if (!gappNewIds.includes(newId))
    throw new Error("You are not allowed to delete this id");

  // Delete related votes
  const { error: votesError } = await supabase
    .from("votes")
    .delete()
    .eq("newsId", newId);

  if (votesError) {
    console.error("Error deleting related votes:", votesError.message);
    throw new Error("Failed to delete related votes");
  }
  // Delete related comments
  const { error: commentsError } = await supabase
    .from("comments")
    .delete()
    .eq("newsId", newId);

  if (commentsError) {
    console.error("Error deleting related comments:", commentsError.message);
    throw new Error("Failed to delete related comments");
  }

  //Dele related media

  const { error: mediaError } = await supabase
  .from("media_table")
  .delete()
  .eq("newsId", newId);

if (mediaError) {
  console.error("Error deleting related media:", mediaError.message);
  return;
}
  const { error } = await supabase
    .from("news")
    .delete()
    .eq("newsId", newId);

  if (error) {
    throw new Error("News could not be deleted");
  }
  revalidatePath("/account/news");
}



export async function searchNews(query: string) {
  const { data, error } = await supabase
  .from("news")
  .select(`
    newsId,
    newsTitle,
    newsDescription,
    createdAt,
    street,
    city,
    state,
    country,
    photos:media_table (
      id,
      url,
      type,
      createdAt
    )
  `)
  .or(`city.ilike.%${query}%,state.ilike.%${query}%,country.ilike.%${query}%`)
  .order("createdAt", { ascending: false });

  revalidatePath(`/listnews/${query}`)

  if (error) {
    console.error("Error searching news:", error.message);
    throw new Error("Failed to fetch news.");
  }

  return data;
}




export async function castVote(userId: number, newsId: number, voteValue: number) {
  const { data: existingVote } = await supabase
    .from("votes")
    .select("voteValue")
    .eq("userId", userId)
    .eq("newsId", newsId)
    .single();


  // Calculate changes
  const upvotesChange = voteValue === 1 ? 1 : existingVote?.voteValue === 1 ? -1 : 0;
  const downvotesChange = voteValue === -1 ? 1 : existingVote?.voteValue === -1 ? -1 : 0;
  const voteScoreChange = existingVote
    ? voteValue - (existingVote.voteValue || 0)
    : voteValue;

 
  if (existingVote) {
    if (existingVote.voteValue === voteValue) {
      // Reset vote
      await supabase.from("votes").delete().eq("userId", userId).eq("newsId", newsId);
    } else {
      // Change vote
      await supabase
        .from("votes")
        .update({ voteValue })
        .eq("userId", userId)
        .eq("newsId", newsId);
    }
  } else {
    // Insert new vote
    await supabase.from("votes").insert({ userId, newsId, voteValue });
  }

  // Fetch current values from the news table
  const { data: currentNews, error: fetchError } = await supabase
    .from("news")
    .select("upVotes, downVotes, votesScore")
    .eq("newsId", newsId)
    .single();

  if (fetchError) {
    console.error("Error fetching current news values:", fetchError.message);
    throw new Error("Failed to fetch current news values.");
  }

  // Calculate new values
  const updatedUpvotes = (currentNews?.upVotes || 0) + upvotesChange;
  const updatedDownvotes = (currentNews?.downVotes || 0) + downvotesChange;
  const updatedVoteScore = (currentNews?.votesScore || 0) + voteScoreChange;



  // Update the news table
  const { error: updateError } = await supabase
    .from("news")
    .update({
      upVotes: updatedUpvotes,
      downVotes: updatedDownvotes,
      votesScore: updatedVoteScore,
    })
    .eq("newsId", newsId);
revalidatePath(`account/newdetail/${newsId}`)
  if (updateError) {
    console.error("Error updating news table:", updateError.message);
    throw new Error("Failed to update news table");
  }
}

export async function addComment(formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const userId = Number(formData.get("userId"));
  const newsId = Number(formData.get("newsId"));
  const commentText = formData.get("commentText") as string;

  if (!commentText.trim()) {
    return { success: false, error: "Comment text is required" };
  }

  try {
    const { error } = await supabase
      .from("comments")
      .insert({ userId, newsId, commentText });

    if (error) {
      console.error("Error adding comment:", error.message);
      throw new Error("Failed to add comment");
    }
    revalidatePath(`account/newdetail/${newsId}`)

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to add comment" };
  }
}


export async function deleteComment(commentId: number) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("commentId", commentId)
      .select("newsId");

      const newsId = data?.[0]?.newsId; // Assuming data is an array

    if (error) {
      console.error("Error deleting comment:", error.message);
      return { success: false, error: "Failed to delete comment" };
    }
    revalidatePath(`account/newdetail/${newsId}`)

    return { success: true };
  } catch (err) {
    console.error("Error deleting comment:", err);
    return { success: false, error: "Failed to delete comment" };
  }
}

type UpdateCommentInput = {
  commentId: number;
  commentText: string;
};

export async function updateComment(input: UpdateCommentInput): Promise<{ success: boolean }> {
  const { commentId, commentText } = input;

  const { error } = await supabase
    .from("comments")
    .update({ commentText: commentText })
    .eq("commentId", commentId);

  if (error) {
    console.error("Failed to update comment:", error.message);
    return { success: false };
  }

  return { success: true };
}

// app/_lib/actions/address.ts

export async function fetchAddressFromNominatim({
  street,
  city,
  state,
  country,
}: {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}) {
  const queryParts = [street, city, state, country].filter(Boolean).join(", ");
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    queryParts
  )}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Nominatim API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      console.warn("No results from Nominatim for:", queryParts);
      return null;
    }

    return data[0]; // Return the first matching result
  } catch (error) {
    console.error("Error fetching address from Nominatim:", error);
    return null;
  }
}


type UpdateNewResult = {
  success: boolean;
  validationErrors?: Record<string, string>;
  error?: string;
};

export async function updateNew(
  newsId: number,
  formData: FormData
): Promise<UpdateNewResult> {

  try {
    // Extract fields from FormData
    const title = formData.get("title") as string | null;
    const categoryId = formData.get("categoryId") as string | null;
    const subCategoryId = formData.get("subCategoryId") as string | null;
    const content = formData.get("content") as string | null;
    const selectedAddress = formData.get("selectedAddress") as string | null;
    const photosToRemove = JSON.parse(formData.get("photosToRemove") as string) as number[]; // Expecting JSON array


    // Validate required fields
    if (!title || !categoryId || !content || !selectedAddress) {
      return {
        success: false,
        validationErrors: {
          title: title ? "" : "Title is required.",
          categoryId: categoryId ? "" : "Category is required.",
          content: content ? "" : "Content is required.",
          selectedAddress: selectedAddress
            ? ""
            : "Address selection is required.",
        },
      };
    }

    // Parse address from JSON
    const address = JSON.parse(selectedAddress);

    // Update news record
    const { error: newsUpdateError } = await supabase
      .from("news")
      .update({
        newsTitle: title,
        newsDescription: content,
        categoryId: Number(categoryId),
        subCategoryId: subCategoryId ? Number(subCategoryId) : null,
        street: address.street || null,
        city: address.city || null,
        state: address.state || null,
        country: address.country || null,
        latitude: address.latitude || null,
        longitude: address.longitude || null,
        modifiedAt: new Date().toISOString(),
      })
      .eq("newsId", newsId);

    if (newsUpdateError) {
      console.error("Error updating news:", newsUpdateError.message);
      return { success: false, error: "Failed to update news record." };
    }

    // Handle file uploads
    const files = formData.getAll("image") as File[];
    console.log(files)
    if (photosToRemove.length > 0) {
      const { error: deleteError } = await supabase
        .from("media_table")
        .delete()
        .in("id", photosToRemove);

      if (deleteError) {
        console.error("Error removing photos:", deleteError.message);
        return { success: false, error: "Failed to remove photos." };
      }
    }

    // Upload new files and save their metadata
    for (const file of files) {
      const fileName = `${Math.random()}-${file.name}`.replace("/", "");
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError.message);
        return { success: false, error: "Failed to upload file." };
      }

      const filePath = `${supabase.storage.from("pictures").getPublicUrl(uploadData?.path).data.publicUrl}`;

      // Insert file metadata into `media_table`
      const { error: mediaInsertError } = await supabase.from("media_table").insert({
        newsId,
        url: filePath,
        type: file.type,
      });

      if (mediaInsertError) {
        console.error("Error inserting file metadata:", mediaInsertError.message);
        return { success: false, error: "Failed to save file metadata." };
      }
    }

    revalidatePath(`/account/newdetail/${newsId}`);
    revalidatePath(`/account/news`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
















