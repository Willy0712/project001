import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProductImages from "../../_components/ProductImages";
import {
  getAuthorDetailsByNewsId,
  getComments,
  getPublicNewsWithCategoriesAndSubcategories,
  getUserVote,
} from "@/app/_lib/services/data-service";
import { format } from "date-fns";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "@/app/_components/LoginMessage";
import NewsVoting from "@/app/_components/NewsVoting";
import CommentSection from "@/app/_components/CommentSection";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export default async function Page({ params }: { params: Params }) {
  const newDetail = await getPublicNewsWithCategoriesAndSubcategories(
    params.id
  );
  const {
    photos,
    newsTitle,
    newsDescription,
    createdAt,
    newsId,
    upVotes,
    downVotes,
    votesScore,
  } = newDetail;

  const session = await auth();
  const userId = Number(session?.user?.id);
  const authorDetails = await getAuthorDetailsByNewsId(newsId);

  if (!authorDetails) {
    return;
  }

  const { fullName, imageURL } = authorDetails;

  const initialVote = await getUserVote(newsId, userId);
  const allComments = await getComments(newsId);
  const comments = allComments.map(({ app_users, ...comment }) => ({
    ...comment,
    isEditing: false, // Tracks if the comment is in editing mode
    editText: comment.commentText || "", // Holds the editable text (initialized to the original text)
    fullName: app_users?.fullName || "Anonymous", // Extract fullName from app_users
    imageURL: app_users?.imageURL || "/placeholder-avatar.png", // Extract imageURL from app_users
  }));

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <ProductImages
              mainImageUrl={photos[0]?.url as string}
              thumbnails={photos.map((photo) => photo.url as string)}
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{newsTitle}</h2>
            <div className="text-gray-600 mb-4 flex gap-3 items-center">
              {`Uploaded on ${format(
                new Date(createdAt),
                "EEE, MMM dd yyyy"
              )} by ${fullName}`}{" "}
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src={imageURL || "No photo"}
                alt={imageURL || "User name"}
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-gray-700 mb-6">{newsDescription}</p>
            {session?.user ? (
              <NewsVoting
                newsId={newsId}
                userId={userId}
                initialVote={initialVote}
                upVotes={upVotes}
                downVotes={downVotes}
                votesScore={votesScore}
              />
            ) : (
              <LoginMessage />
            )}
          </div>
        </div>
      </div>
      {/* Comments Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            {session?.user ? (
              <Suspense fallback={<Spinner />}>
                <CommentSection
                  newsId={newsId}
                  userId={userId}
                  allComments={comments}
                />
              </Suspense>
            ) : (
              <LoginMessage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
