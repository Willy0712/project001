import NewsList from "@/app/_components/NewsList";
import { auth } from "@/app/_lib/auth";
import {
  getNewsWithCategoriesAndSubcategories,
  getPhotosForNews,
} from "@/app/_lib/services/data-service";
import React from "react";

export default async function page() {
  const session = await auth();
  const userId = Number(session?.user?.id);
  const news = await getNewsWithCategoriesAndSubcategories(userId);
  // Fetch photos for each news
  const newsWithPhotos = await Promise.all(
    news.map(async (n) => {
      const photos = await getPhotosForNews(n.newsId);
      return { ...n, photos };
    })
  );

  return (
    <div>
      {news.length === 0 ? (
        <p className="text-lg">
          You have no news yet.
          <a className="underline text-primary-500" href="/account/upload">
            Upload a new &rarr;
          </a>
        </p>
      ) : (
        <NewsList news={newsWithPhotos} />
      )}
    </div>
  );
}
