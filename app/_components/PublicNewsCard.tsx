import React from "react";
import { searchNews } from "../_lib/actions";
import Image from "next/image";
import Link from "next/link";

type Photo = {
  id: number;
  url: string | null;
  type: string | null;
  createdAt: string;
};

type News = {
  newsId: number;
  newsTitle: string | null;
  newsDescription: string | null;
  createdAt: string;
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  photos: Photo[]; // Array of photos
};

type NewsCardProps = {
  news: News;
};

export default async function PublicNewsCard({ news }: NewsCardProps) {
  const {
    newsId,
    newsTitle,
    newsDescription,
    createdAt,
    street,
    city,
    state,
    country,
    photos,
  } = news;
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Image
          src={photos[0]?.url || "/placeholder.jpg"}
          width={400}
          height={100}
          alt={newsTitle as string}
          className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{newsTitle}</h4>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Address:</span>{" "}
            {city}, {state}, {country}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Description:</span>
            {newsDescription}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Created date:</span>{" "}
            {createdAt}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/newdetail/${newsId}`}
          className="bg-primary-900 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-primary-700"
        >
          Check new
        </Link>
      </div>
    </div>
  );
}
