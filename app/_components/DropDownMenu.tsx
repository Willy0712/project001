import React from "react";
import { auth } from "../_lib/auth";
import Link from "next/link";
import SignOut from "./SignOut";

export default async function DropDownMenu() {
  const session = await auth();

  return (
    <div className="relative group">
      {/* User's Rounded Profile Image */}
      <img
        className="w-12 h-12 rounded-full cursor-pointer"
        src={session?.user?.image || "No photo"}
        alt={session?.user?.name || "User name"}
        referrerPolicy="no-referrer"
      />

      {/* Dropdown Menu */}
      <ul className="absolute right-0 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block">
        <li>
          <Link
            href="account/upload"
            className="block px-4 py-2 text-gray-800 hover:bg-primary-100 hover:text-gray-900"
          >
            Upload news
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="block px-4 py-2 text-gray-800 hover:bg-primary-100 hover:text-gray-900"
          >
            Account
          </Link>
        </li>
        <SignOut />
      </ul>
    </div>
  );
}
