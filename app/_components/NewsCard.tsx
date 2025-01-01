import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { get } from "http";
import Link from "next/link";
import React from "react";
import { getPhotosForNews } from "../_lib/services/data-service";
import Image from "next/image";
import DeleteWithId from "./DeleteWithId";
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
  photos: Photo[];
  categoryId: { categoryId: number; categoryName: string | null } | null; // Supabase returns an array even for single relation
  subCategoryId: {
    subCategoryId: number;
    subCategoryName: string | null;
  } | null; // Supabase returns an array even for single relation
};
type NewsListProps = {
  news: NewsWithCategoriesAndSubCategories;
  onDelete: (newId: number) => void;
};

export default function NewsCard({ news, onDelete }: NewsListProps) {
  const {
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
    photos,
    categoryId,
    subCategoryId,
  } = news;

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={photos[0]?.url || "/placeholder.png"}
          alt={`New ${newsTitle}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{newsTitle}</h3>
        </div>
        {newsDescription}

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold">${street}</p>
          <p className="text-lg">${city}</p>
          <p className="text-lg">${state}</p>
          <p className="text-lg">${country}</p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        <>
          <Link
            href={`/account/news/edit/${newsId}`}
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteWithId id={newsId} onDelete={onDelete} />
        </>
      </div>
    </div>
  );
}
