"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      // Redirect to the listnews/[query] page
      router.push(`/listnews/${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className="flex mt-4 sm:mt-0">
      <input
        type="text"
        name="search"
        id="price"
        className="block w-full rounded-full borde-5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
        placeholder="search"
      />
    </div>
  );
}
