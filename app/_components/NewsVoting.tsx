"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

// {
//     newsId,
//     userVote,
//     voteScore,
//   }: {
//     newsId: number;
//     userVote: number;
//     voteScore: number;
//   }
export default function NewsVoting() {
  const [currentVote, setCurrentVote] = useState(1);

  //   async function handleVote(newVote: number) {
  //     if (currentVote === newVote) {
  //       // Reset vote if the same button is clicked
  //       setCurrentVote(0);
  //       await castVote(newsId, 0);
  //     } else {
  //       // Update vote
  //       setCurrentVote(newVote);
  //       await castVote(newsId, newVote);
  //     }
  //   }

  return (
    <div className="flex items-center gap-2">
      <button
        className={`p-2 rounded-full ${
          currentVote === 1
            ? "bg-primary-900 text-white"
            : "bg-gray-300 text-gray-800"
        } hover:bg-primary-400 focus:outline-none transition`}
        // onClick={() => handleVote(1)}
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
      <div>Vote this new</div>
      <button
        className={`p-2 rounded-full ${
          currentVote === -1
            ? "bg-red-500 text-white"
            : "bg-gray-300 text-gray-800"
        } hover:bg-red-400 focus:outline-none transition`}
        // onClick={() => handleVote(-1)}
      >
        <ArrowDownIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
