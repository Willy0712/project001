"use server";

import { PostgrestError } from "@supabase/supabase-js";
import { signIn, signOut } from "./auth";
import supabase from "./services/supabase";
import { revalidatePath } from "next/cache";

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
  console.log("Form Data:", formData);
  const title = formData.get("title") as string;
  const categoryId = parseInt(formData.get("categoryId") as string, 10);
  const description = formData.get("content") as string; // Markdown or plain text
  const address = JSON.parse(formData.get("selectedAddress") as string);
  const userId = parseInt(formData.get("userId") as string, 10);
  

  // Map address fields
  const { street, state, country, latitude, longitude, number, city } = address;

  const fullStreet = `${street} ${number} `;
  
  console.log("Address:", address);

  // Validate required fields
  if (!title || !categoryId || !description) {
    throw new Error("All required fields must be provided.");
  }

  // Prepare the data object
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
    userId // Populate with the actual user ID from your authentication context
  };

  console.log("News Data:", newsData);
  

  try {
  // Insert into the `news` table
  const { data, error } = await supabase.from("news").insert([newsData]);
  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    // Throw a Supabase-specific error
    throw new Error(error?.message);
  }

  return { success: true };
} catch (err) {
  return { success: false};
}
revalidatePath("/account/upload");
}

