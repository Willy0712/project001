"use client";
import Link from "next/link";
import React from "react";
import { signOutAction } from "../_lib/actions";

export default function SignOut() {
  return (
    <li>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          signOutAction();
        }}
        className="block px-4 py-2 text-gray-800 hover:bg-primary-100 hover:text-gray-900"
      >
        Sign out
      </Link>
    </li>
  );
}
