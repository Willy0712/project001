"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { castVote } from "../_lib/actions";

export default function NewsVoting({
  newsId,
  userId,
  initialVote,
  upVotes,
  downVotes,
  votesScore,
}: {
  newsId: number;
  userId: number;
  initialVote: number | null;
  upVotes: number | null;
  downVotes: number | null;
  votesScore: number | null;
}) {
  const [currentVote, setCurrentVote] = useState<number | null>(initialVote); // Manages the user's current vote
  const [isLoading, setIsLoading] = useState(false); // Handles button loading state

  console.log("newsId client", newsId);

  async function handleVote(newVote: number) {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (currentVote === newVote) {
        // Reset vote
        setCurrentVote(null);
        await castVote(userId, newsId, 0);
      } else {
        // Cast or change vote
        setCurrentVote(newVote);
        await castVote(userId, newsId, newVote);
      }
    } catch (error) {
      console.error("Failed to cast vote:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        {/* {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-yellow-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        ))} */}
        <span className="ml-2 text-gray-600"> {votesScore} votes</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Upvote Button */}
        <button
          className={`p-2 rounded-full ${
            currentVote === 1
              ? "bg-primary-900 text-white"
              : "bg-gray-300 text-gray-800"
          } hover:bg-primary-400 focus:outline-none transition`}
          onClick={() => handleVote(1)}
          disabled={isLoading}
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>

        <div>Vote this news</div>

        {/* Downvote Button */}
        <button
          className={`p-2 rounded-full ${
            currentVote === -1
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-800"
          } hover:bg-red-400 focus:outline-none transition`}
          onClick={() => handleVote(-1)}
          disabled={isLoading}
        >
          <ArrowDownIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-col items-center gap-2">
        <p className="text-sm font-medium text-gray-800">
          Upvotes: {upVotes} | Downvotes: {downVotes}
        </p>
      </div>
    </div>
  );
}
