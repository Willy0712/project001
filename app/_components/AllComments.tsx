"use client";
import { format } from "date-fns";
import React from "react";
import Button from "./Button";
import DeleteWithId from "./DeleteWithId";

type Comment = {
  commentId: number;
  commentText: string | null;
  createdAt: string;
  userId: number | null;
};

export default function AllComments({
  allComments,
  userId,
  onDelete,
  avatarUrl,
  username,
}: {
  allComments: Comment[];
  userId: number;
  onDelete: (commentId: number) => void;
  avatarUrl: string | null | undefined;
  username: string | null | undefined;
}) {
  return (
    <div className="space-y-4 mt-4">
      {allComments.map((comment) => (
        <div
          key={comment.commentId}
          className="p-4 bg-white rounded-md shadow-lg border border-gray-200"
        >
          {/* User Info Section */}
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full object-cover shadow-sm mr-4"
              src={avatarUrl || "/placeholder-avatar.png"}
              alt={username || "User Avatar"}
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {username || "Anonymous"}
              </h4>
              <p className="text-sm text-gray-500">
                {format(
                  new Date(comment.createdAt),
                  "EEE, MMM dd yyyy hh:mm a"
                )}
              </p>
            </div>
          </div>

          {/* Comment Text */}
          <p className="text-gray-700 mb-4">{comment.commentText}</p>

          {/* Actions Section */}
          <div className="flex justify-between items-center">
            {comment.userId === userId && (
              <DeleteWithId
                id={comment.commentId}
                onDelete={() => onDelete(comment.commentId)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
