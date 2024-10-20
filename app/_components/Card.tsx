import Image, { StaticImageData } from "next/image";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  imageSrc: string | StaticImageData; // Assuming imageSrc is a URL string
  country: string; // Assuming country is a string
};

export default function Card({ children, imageSrc, country }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={imageSrc}
        alt={country}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 text-center">
        <h3 className="text-xl font-medium mb-2"></h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
