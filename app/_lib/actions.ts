"use server";

import { PostgrestError } from "@supabase/supabase-js";
import { signIn, signOut } from "./auth";
import supabase from "./services/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createNew(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract data from FormData
    const title = formData.get("title") as string;
    const categoryId = parseInt(formData.get("categoryId") as string, 10);
    const description = formData.get("content") as string;
    const address = JSON.parse(formData.get("selectedAddress") as string);
    const userId = parseInt(formData.get("userId") as string, 10);
    const images = formData.getAll("image") as File[]; // Get all images as File objects

    if (!title || !categoryId || !description || images.length === 0) {
      throw new Error("All required fields and at least one image must be provided.");
    }

    // Map address fields
    const { street, state, country, latitude, longitude, number, city } = address;
    const fullStreet = `${street} ${number}`;

    // Prepare the data object for the news table
    const newsData = {
      newsTitle: title,
      newsDescription: description,
      categoryId,
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
    const { data: news, error: newsError } = await supabase.from("news").insert([newsData]).select("newsId").single();

    if (newsError || !news) {
      throw new Error(newsError?.message || "Failed to insert news.");
    }

    const newsId = news.newsId;

    // Upload each image to Supabase Storage and save its URL in `media_table`
    for (const image of images) {
      const fileName = `${Math.random()} - ${image.name}`.replaceAll(
    "/",
    ""
  );; // Unique file name
      // const filePath = `news_images/${fileName}`;

      // Upload to Supabase Storage
      const { data: storageData, error: storageError } = await supabase.storage.from("pictures").upload(fileName, image);

      if (storageError) {
        console.error("Failed to upload image:", storageError.message);
        continue; // Skip this image and proceed with the next
      }

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/pictures/${fileName}`;

      // Insert the image URL into the `media_table`
      const mediaData = {
        newsId,
        url: imageUrl,
        type: image.type,
        createdAt: new Date().toISOString(),
      };

      const { error: mediaError } = await supabase.from("media_table").insert([mediaData]);

      if (mediaError) {
        console.error("Failed to save media data:", mediaError.message);
      }
    }

    // Revalidate the path after successful submission
    revalidatePath("/account/upload");
    

    return { success: true };
    redirect("/account/news");
  } catch (err) {
    console.error(err);
    return { success: false, error: (err as Error).message };
  }
}

