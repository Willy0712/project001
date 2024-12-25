import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProductImages from "../../_components/ProductImages";
import {
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

  console.log("newsId", newsId);

  const session = await auth();
  const userId = Number(session?.user?.id);
  const avatar = session?.user?.image;
  const username = session?.user?.name;

  const initialVote = await getUserVote(newsId, userId);
  const comments = await getComments(newsId);

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
            <p className="text-gray-600 mb-4">
              {format(new Date(createdAt), "EEE, MMM dd yyyy")}
            </p>

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
                  avatarUrl={avatar}
                  username={username}
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
