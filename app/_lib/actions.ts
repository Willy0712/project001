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

type NewsData = {
  title: string;
  categoryId: number;
  subCategoryId: number;
  address: {
    street?: string;
    state?: string;
    country?: string;
    latitude: string;
    longitude: string;
  };
  content: string;
};

// export async function createNew(formData: FormData): Promise<{ success: boolean; error?: string }> {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");
//   try {

//     const data = Object.fromEntries(formData.entries());    // Extract data from FormData
//     const title = formData.get("title") as string;
//     const categoryId = parseInt(formData.get("categoryId") as string, 10);
//     const subCategoryId = parseInt(formData.get("subCategoryId") as string, 10);
//     const description = formData.get("content") as string;
//     const address = JSON.parse(formData.get("selectedAddress") as string);
//     const userId = parseInt(formData.get("userId") as string, 10);
//     const images = formData.getAll("image") as File[]; // Get all images as File objects
    

//     if (!title || !categoryId || !description || images.length === 0) {
//       throw new Error("All required fields and at least one image must be provided.");
//     }
//     // Validate with Zod
//     const validatedData = uploadNewsSchemaServer.parse({
//       ...data,
//       categoryId: data.categoryId,
//       subCategoryId: data.subCategoryId,
//       userId: data.userId,
//       image: images,
//     });

//     // Map address fields
//     const { street, state, country, latitude, longitude, number, city } = address;
//     const fullStreet = `${street} ${number}`;

//     // Prepare the data object for the news table
//     const newsData = {
//       newsTitle: title,
//       newsDescription: description,
//       categoryId,
//       subCategoryId,
//       street: fullStreet,
//       city,
//       state,
//       country,
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       createdAt: new Date().toISOString(),
//       modifiedAt: new Date().toISOString(),
//       userId,
//     };

//     // Insert into the `news` table
//     const { data: news, error: newsError } = await supabase.from("news").insert([newsData]).select("newsId").single();

//     if (newsError || !news) {
//       throw new Error(newsError?.message || "Failed to insert news.");
//     }

//     const newsId = news.newsId;

//     // Upload each image to Supabase Storage and save its URL in `media_table`
//     for (const image of images) {
//       const fileName = `${Math.random()} - ${image.name}`.replaceAll(
//     "/",
//     ""
//   );; // Unique file name
//       // const filePath = `news_images/${fileName}`;

//       // Upload to Supabase Storage
//       const { data: storageData, error: storageError } = await supabase.storage.from("pictures").upload(fileName, image);

//       if (storageError) {
//         console.error("Failed to upload image:", storageError.message);
//         continue; // Skip this image and proceed with the next
//       }

//       const imageUrl = `${supabaseUrl}/storage/v1/object/public/pictures/${fileName}`;

//       // Insert the image URL into the `media_table`
//       const mediaData = {
//         newsId,
//         url: imageUrl,
//         type: image.type,
//         createdAt: new Date().toISOString(),
//       };

//       const { error: mediaError } = await supabase.from("media_table").insert([mediaData]);

//       if (mediaError) {
//         console.error("Failed to save media data:", mediaError.message);
//       }
//     }

//     // Revalidate the path after successful submission
//     revalidatePath("/account/upload");
    

//     return { success: true };
//   } catch (err) {
//     console.error(err);
//     return { success: false, error: (err as Error).message };
//   }
// }

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
      country
    `)
    .or(
      `city.ilike.%${query}%,state.ilike.%${query}%,country.ilike.%${query}%`
    )
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error searching news:", error.message);
    throw new Error("Failed to fetch news.");
  }

  return data;
}



