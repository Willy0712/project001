"use server";

import { PostgrestError } from "@supabase/supabase-js";
import { auth, signIn, signOut } from "./auth";
import supabase from "./services/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadNewsSchemaServer } from "./validation";
import { ZodError } from "zod";
import { getNewsWithCategoriesAndSubcategories } from "./services/data-service";

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
    console.log("error", error)

  if (error) {
    throw new Error("News could not be deleted");
  }
  revalidatePath("/account/news");
}



export async function searchNews(query: string) {
  console.log("query", query)
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
  console.log("data", data)

  
  

  if (error) {
    console.error("Error searching news:", error.message);
    throw new Error("Failed to fetch news.");
  }

  return data;
}

async function castVote(userId: number, newsId: number, voteValue: number) {
  // Check if the user has already voted
  // const { data: existingVote } = await supabase
  //   .from("votes")
  //   .select("voteValue")
  //   .eq("userId", userId)
  //   .eq("newsId", newsId)
  //   .single();

  // if (existingVote) {
  //   // If the same vote is clicked again, reset the vote to neutral
  //   if (existingVote.voteValue === voteValue) {
  //     await supabase
  //       .from("votes")
  //       .delete()
  //       .eq("userId", userId)
  //       .eq("newsId", newsId);
  //   } else {
  //     // Update the existing vote
  //     await supabase
  //       .from("votes")
  //       .update({ voteValue, updatedAt: new Date() })
  //       .eq("userId", userId)
  //       .eq("newsId", newsId);
  //   }
  // } else {
  //   // If no previous vote exists, insert a new vote
  //   await supabase.from("votes").insert({
  //     userId,
  //     newsId,
  //     voteValue,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // }

  // // Recalculate aggregated votes for the news item
  // const { data: votes } = await supabase
  //   .from("votes")
  //   .select("voteValue")
  //   .eq("newsId", newsId);

  // const upvotes = votes.filter((v) => v.voteValue === 1).length;
  // const downvotes = votes.filter((v) => v.voteValue === -1).length;
  // const voteScore = upvotes - downvotes;

  // // Update the aggregated counts in the news table
  // await supabase
  //   .from("news")
  //   .update({ upvotes, downvotes, voteScore })
  //   .eq("newsId", newsId);
}




