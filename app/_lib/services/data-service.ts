import { notFound } from "next/navigation";
import supabase from "./supabase";
import { Database } from "@/database.types";

type AppUser = Database["public"]["Tables"]["app_users"]["Row"];


export async function getAppUser(email: string) {
 
    const {data, error} = await supabase.from("app_users").select("*").eq("email", email).single();

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
    categoryId:categories  (
      categoryId,
      categoryName
    ),
     subCategoryId:sub_categories  (
      subCategoryId,
      subCategoryName
    ),
    photos:media_table (
    id,
    url,
    type,
    createdAt
    )
  `)
  .eq("userId", userId);

  if (error) {
    console.error("Error fetching news:", error.message);
    throw new Error("Failed to fetch news.");
  }

  return data;
}

export async function getPublicNewsWithCategoriesAndSubcategories(newId: number) {
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
      upVotes,
      downVotes,
      votesScore,
      categories:categoryId (
        categoryId,
        categoryName
      ),
      sub_categories:subCategoryId (
        subCategoryId,
        subCategoryName
      ),
      photos:media_table (
        id,
        url,
        type,
        createdAt
      )
    `)
    .eq("newsId", newId)
    .single(); // Ensures a single object is returned

  if (error) {
    console.error("Error fetching news:", error.message);
    notFound();
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

export async function getUserVote(newsId: number, userId: number): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from("votes")
      .select("voteValue")
      .eq("newsId", newsId)
      .eq("userId", userId)
      .single();

    if (error) {
      console.error("Error fetching user vote:", error.message);
      return null;
    }

    return data?.voteValue || null;
  } catch (err) {
    console.error("Unexpected error fetching user vote:", err);
    return null;
  }
}





export async function getComments(newsId: number) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(`commentId, commentText, createdAt, userId, app_users (
      fullName,
      imageURL
    )`)
      .eq("newsId", newsId)
      .order("createdAt", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error.message);
      throw new Error("Failed to fetch comments");
    }

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}


export async function getAuthorDetailsByNewsId(newsId: number): Promise<{ fullName: string; imageURL: string } | null> {
  try {
    const { data, error } = await supabase
      .from("news")
      .select(`
        userId,
        app_users (
          fullName,
          imageURL
        )
      `)
      .eq("newsId", newsId)
      .single();


    if (error) {
      console.error("Error fetching user's details:", error.message);
      throw new Error("Failed to fetch user's details");
    }

    const imageURL = data?.app_users?.imageURL || "";

    if (!data?.app_users?.fullName) {
      throw new Error("User details not found");
    }

    const { fullName } = data.app_users;
    return { fullName, imageURL };
  } catch (err) {
    console.error(err);
    return null;
  }
}


export async function getNewsById(newsId: number) {
  try {
    const { data, error } = await supabase
      .from("news")
      .select(
        `
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
        categoryId:categories (
          categoryId,
          categoryName
        ),
        subCategoryId: sub_categories (
          subCategoryId,
          subCategoryName
        ),
        photos:media_table (
          id,
          url,
          type,
          createdAt
        )
      `
      )
      .eq("newsId", newsId)
      .single();


    if (error) {
      console.error("Error fetching news by ID:", error.message);
      throw new Error("Failed to fetch news by ID.");
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching news by ID:", err);
    throw new Error("Unexpected error occurred while fetching news.");
  }
}













