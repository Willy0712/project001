"use client";
import React, { useOptimistic } from "react";

import { deleteComment } from "../_lib/actions";
import AddComment from "./AddComment";
import AllComments from "./AllComments";

type Comment = {
  commentId: number;
  commentText: string | null;
  createdAt: string;
  userId: number | null;
  isEditing: boolean;
  editText: string;
  fullName: string;
  imageURL: string;
};

export default function CommentSection({
  newsId,
  userId,
  allComments,
}: {
  newsId: number;
  userId: number;
  allComments: Comment[];
}) {
  const [optimisticComments, optimisticDelete] = useOptimistic(
    allComments,
    (cuComment, comId) => {
      return cuComment.filter((comm) => comm.commentId !== comId);
    }
  );

  async function handleDelete(newId: number) {
    optimisticDelete(newId);
    await deleteComment(newId);
  }
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      <AddComment newsId={newsId} userId={userId} />
      <AllComments
        allComments={optimisticComments}
        userId={userId}
        onDelete={handleDelete}
      />
    </div>
  );
}
