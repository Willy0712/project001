"use client";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchInput() {
  const [searchNewParam, setSearchNewParam] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchNewParam.trim() !== "") {
      // Redirect to the listnews/[query] page
      router.push(`/listnews/${encodeURIComponent(searchNewParam)}`);
    }
  };
  return (
    <div className="flex mt-4 sm:mt-0 gap-5">
      <input
        value={searchNewParam}
        onChange={(e) => setSearchNewParam(e.target.value)}
        type="text"
        name="search"
        id="price"
        className="block w-full rounded-full borde-5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
        placeholder="Search for news by city, state, or country"
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-primary-900 text-white rounded-full hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white"
      >
        &rarr;
      </button>
    </div>
  );
}
