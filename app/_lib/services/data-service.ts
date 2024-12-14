import supabase from "./supabase";
import { Database } from "@/database.types";

type AppUser = Database["public"]["Tables"]["app_users"]["Row"];

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

