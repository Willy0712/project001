"use client";
import { format } from "date-fns";
import React, { useState } from "react";
import Button from "./Button";
import DeleteWithId from "./DeleteWithId";
import { updateComment } from "../_lib/actions";
import toast from "react-hot-toast";

type Comment = {
  commentId: number;
  userId: number | null;
  commentText: string | null;
  createdAt: string;
  fullName: string;
  imageURL: string;
};

type UpdateCommentInput = {
  commentId: number;
  newContent: string;
};

type EditableComment = Comment & {
  isEditing: boolean;
  editText: string | null;
};

type Props = {
  allComments: Comment[];
  userId: number;
  onDelete: (commentId: number) => void;
  avatarUrl: string | null | undefined;
  username: string | null | undefined;
};

export default function AllComments({
  allComments,
  userId,
  onDelete,
}: {
  allComments: Comment[];
  userId: number;
  onDelete: (commentId: number) => void;
}) {
  const [commentsState, setCommentsState] = useState<EditableComment[]>(() =>
    allComments.map((comment) => ({
      commentId: comment.commentId,
      userId: comment.userId,
      commentText: comment.commentText,
      createdAt: comment.createdAt,
      isEditing: false, // Tracks if the comment is in editing mode
      editText: comment.commentText, // Holds the updated text during editing
      fullName: comment.fullName || "Anonymous", // Extract fullName
      imageURL: comment.imageURL || "/placeholder-avatar.png", // Extract imageURL
    }))
  );

  const onEdit = (commentId: number): void => {
    setCommentsState((prev) =>
      prev.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, isEditing: true }
          : comment
      )
    );
  };

  const onEditChange = (commentId: number, newText: string): void => {
    setCommentsState((prev) =>
      prev.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, editText: newText }
          : comment
      )
    );
  };
  const onSave = async (commentId: number): Promise<void> => {
    const commentToUpdate = commentsState.find(
      (comment) => comment.commentId === commentId
    );

    if (!commentToUpdate) {
      return;
    }

    if (!commentToUpdate.editText) {
      return;
    }

    // Pass the correct object to `updateComment`
    const result = await updateComment({
      commentId,
      commentText: commentToUpdate.editText,
    });

    if (result.success) {
      setCommentsState((prev) =>
        prev.map((comment) =>
          comment.commentId === commentId
            ? {
                ...comment,
                commentText: comment.editText, // Update the main comment text
                isEditing: false, // Exit editing mode
              }
            : comment
        )
      );
      toast.success("Comment updated successfully!");
    } else {
      toast.error("Failed to update comment");
    }
  };

  const onCancel = (commentId: number): void => {
    setCommentsState((prev) =>
      prev.map((comment) =>
        comment.commentId === commentId
          ? { ...comment, isEditing: false, editText: comment.commentText }
          : comment
      )
    );
  };

  return (
    <div className="space-y-4 mt-4">
      {commentsState.map((comment) => (
        <div
          key={comment.commentId}
          className="p-4 bg-white rounded-md shadow-lg border border-gray-200"
        >
          {/* User Info Section */}
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full object-cover shadow-sm mr-4"
              src={comment.imageURL || "/placeholder-avatar.png"}
              alt={comment.fullName || "User Avatar"}
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {comment.fullName || "Anonymous"}
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
          {comment.isEditing ? (
            <textarea
              className="w-full p-2 border rounded mb-4 text-gray-700"
              value={comment.editText || ""}
              onChange={(e) => onEditChange(comment.commentId, e.target.value)}
            />
          ) : (
            <p className="text-gray-700 mb-4">{comment.commentText}</p>
          )}

          {/* Actions Section */}
          <div className="flex justify-between items-center">
            {comment.userId === userId && (
              <div className="flex gap-2">
                {comment.isEditing ? (
                  <>
                    <button
                      onClick={() => onSave(comment.commentId)}
                      className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => onCancel(comment.commentId)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onEdit(comment.commentId)}
                      className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-blue-400"
                    >
                      Edit
                    </button>
                    <DeleteWithId
                      id={comment.commentId}
                      onDelete={() => onDelete(comment.commentId)}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
