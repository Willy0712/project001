import Link from "next/link";
import React from "react";

export default function LoginMessage() {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please
        <Link href="/" className="underline text-accent-500">
          login
        </Link>{" "}
        to vote this
        <br /> new
      </p>
    </div>
  );
}
