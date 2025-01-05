import Image from "next/image";
import React from "react";
import heroImage from "@/public/heroimage.webp";
import Button from "./_components/Button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-20 md:pt-35 scroll-magic">
      <div className="container mx-auto px-8 lg:flex lg:items-center">
        <div className="text-center lg:text-left  lg:w-1/2">
          <h1 className="text-4xl lg:text-4xl xl:text-5xl font-bold leading-none">
            Post your story to be proved
          </h1>
          <p className="text-xl lg:text-2xl mt-6 font-light">
            A platform for sharing news to be verified
          </p>
          <Link href="#explore-countries" className="mt-8 md:mt-12">
            <Button>Check Countries</Button>
          </Link>
        </div>
        <div className="relative aspect-square lg:w-1/2">
          <Image
            src={heroImage}
            alt="hero"
            className="object-cover opacity-80 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
