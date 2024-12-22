import supabase from "./supabase";
import { Database } from "@/database.types";

type AppUser = Database["public"]["Tables"]["app_users"]["Row"];
type NewsRow = Database["public"]["Tables"]["news"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type SubCategoryRow = Database["public"]["Tables"]["sub_categories"]["Row"];

export async function getAppUser(email: string) {
 
    const {data, error} = await supabase.from("app_users").select("*").eq("email", email).single();
    if (error) {
        console.error(error);
        throw new Error("Guest could not be found");
      }
    return data;
}

export async function createAppUser(newAppUser: Omit<AppUser, "userId">): Promise<AppUser[]> {
    const {data, error} = await supabase.from("app_users").insert([newAppUser]);
    if (error) {
        console.error(error);
        throw new Error("User could not be created");
      }
    
      return data || [];
}

export async function getNewsWithCategoriesAndSubcategories(userId: number) {
  const { data, error } = await supabase
  .from("news")
  .select(`
    newsId,
    newsTitle,
    newsDescription,
    createdAt,
    modifiedAt,
    street,
    city,
    state,
    country,
    latitude,
    longitude,
    userId,
    categories:categoryId (
      categoryId,
      categoryName
    ),
    sub_categories:subCategoryId (
      subCategoryId,
      subCategoryName
    )
  `)
  .eq("userId", userId);

  if (error) {
    console.error("Error fetching news:", error.message);
    throw new Error("Failed to fetch news.");
  }

  return data;
}


export async function getCategoriesWithSubcategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("categoryId, categoryName, sub_categories(subCategoryId, subCategoryName)")
    .order("categoryId", { ascending: true });


  if (error) {
    console.error("Error fetching categories with subcategories:", error);
    throw new Error("Could not fetch categories");
  }

  return data; // Array of categories with nested subcategories
}

export async function getPhotosForNews(newsId: number) {
  const { data, error } = await supabase
    .from("media_table")
    .select(`
      id,
      url,
      type,
      createdAt
    `)
    .eq("newsId", newsId);

  if (error) {
    console.error("Error fetching photos:", error.message);
    throw new Error("Failed to fetch photos.");
  }

  return data;
}


