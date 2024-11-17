import Logo from "./Logo";
import LoginModal from "./LoginModal";
import { auth } from "../_lib/auth";
import Link from "next/link";
import { signOutAction } from "../_lib/actions";
import SignOut from "./SignOut";

export default async function NavigationBar() {
  const session = await auth();
  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
        <div className="flex items-center text-2xl">
          <div className="w-12 mr-3">
            <Logo />
          </div>
        </div>
        <div className="flex mt-4 sm:mt-0">
          <input
            type="text"
            name="search"
            id="price"
            className="block w-full rounded-full borde-5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
            placeholder="search"
          />
        </div>
        <div className="hidden md:block">
          {!session?.user ? (
            <LoginModal />
          ) : (
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
                    href="/upload"
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
          )}
        </div>
      </div>
    </header>
  );
}
