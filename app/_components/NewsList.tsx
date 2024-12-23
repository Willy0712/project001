"use client";
import { Database } from "@/database.types";
import React, { useOptimistic } from "react";
import NewsCard from "./NewsCard";
import { deleteNew } from "../_lib/actions";
type Photo = {
  id: number;
  url: string | null;
  type: string | null;
  createdAt: string;
};

type NewsWithCategoriesAndSubCategories = {
  newsId: number;
  newsTitle: string | null;
  newsDescription: string | null;
  createdAt: string;
  modifiedAt: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  userId: number | null;
  categories: { categoryId: number; categoryName: string | null }[]; // Supabase returns an array even for single relation
  sub_categories: {
    subCategoryId: number;
    subCategoryName: string | null;
  }[]; // Supabase returns an array even for single relation
  photos: Photo[];
};
type NewsListProps = {
  news: NewsWithCategoriesAndSubCategories[];
};

export default function NewsList({ news }: NewsListProps) {
  const [optimisticNews, optimisticDelete] = useOptimistic(
    news,
    (cuNews, newId) => {
      return cuNews.filter((news) => news.newsId !== newId);
    }
  );

  async function handleDelete(newId: number) {
    optimisticDelete(newId);
    await deleteNew(newId);
  }
  return (
    <div>
      <ul className="space-y-6">
        {optimisticNews.map((news) => (
          <NewsCard news={news} onDelete={handleDelete} key={news.newsId} />
        ))}
      </ul>
    </div>
  );
}
