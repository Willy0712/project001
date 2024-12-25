"use client";
import React, { useState } from "react";
import { addComment } from "../_lib/actions";
import { useFormStatus } from "react-dom";

export default function AddComment({
  newsId,
  userId,
}: {
  newsId: number;
  userId: number;
}) {
  const [commentText, setCommentText] = useState("");
  const { pending } = useFormStatus();
  const [error, setError] = useState<string | null>(null); // To display any returned error

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);

    const result = await addComment(formData);

    if (!result.success) {
      setError(result.error || "Unknown error occurred");
    } else {
      setError(null);
      setCommentText(""); // Clear the input field on success
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-2 border rounded-md"
          name="commentText"
        />
        <input type="hidden" name="newsId" value={newsId} />
        <input type="hidden" name="userId" value={userId} />
        <button
          type="submit"
          disabled={pending}
          className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          {pending ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
