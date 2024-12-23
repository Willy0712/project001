"use client";

import { useState } from "react";

type ProductImagesProps = {
  mainImageUrl: string;
  thumbnails: string[];
};

export default function ProductImages({
  mainImageUrl,
  thumbnails,
}: ProductImagesProps) {
  const [mainImage, setMainImage] = useState(mainImageUrl);

  return (
    <div>
      <img
        src={mainImage}
        alt="Product"
        className="w-full h-auto rounded-lg shadow-md mb-4"
      />
      <div className="flex gap-4 py-4 justify-center overflow-x-auto">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Thumbnail ${index + 1}`}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
            onClick={() => setMainImage(thumbnail)}
          />
        ))}
      </div>
    </div>
  );
}
