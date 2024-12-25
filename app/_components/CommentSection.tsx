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
};

export default function CommentSection({
  newsId,
  userId,
  allComments,
  avatarUrl,
  username,
}: {
  newsId: number;
  userId: number;
  allComments: Comment[];
  avatarUrl: string | null | undefined;
  username: string | null | undefined;
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
        avatarUrl={avatarUrl}
        username={username}
        allComments={optimisticComments}
        userId={userId}
        onDelete={handleDelete}
      />
    </div>
  );
}
