import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProductImages from "../../_components/ProductImages";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import { getPublicNewsWithCategoriesAndSubcategories } from "@/app/_lib/services/data-service";
import { format } from "date-fns";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "@/app/_components/LoginMessage";
import NewsVoting from "@/app/_components/NewsVoting";

export default async function Page({ params }: { params: Params }) {
  const newDetail = await getPublicNewsWithCategoriesAndSubcategories(
    params.id
  );
  const { photos, newsTitle, newsDescription, createdAt } = newDetail;

  const session = await auth();

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

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
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
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">{newsDescription}</p>
            {session?.user ? <NewsVoting /> : <LoginMessage />}
          </div>
        </div>
      </div>
    </div>
  );
}
