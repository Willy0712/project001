"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchInput() {
  const [searchNewParam, setSearchNewParam] = useState("");

  return (
    <div className="flex sm:mt-0 gap-5">
      <input
        value={searchNewParam}
        onChange={(e) => setSearchNewParam(e.target.value)}
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-full border-2 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
        placeholder="Search for news by city, state, or country"
      />

      {/* Conditionally disable the link */}
      <Link
        href={searchNewParam ? `/listnews/${searchNewParam}` : "#"}
        className={`py-2 px-3 rounded-full ${
          searchNewParam
            ? "bg-primary-900 text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        &rarr;
      </Link>
    </div>
  );
}
