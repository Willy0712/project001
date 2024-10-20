"use client";
import React, { useState } from "react";
import Logo from "./Logo";

export default function NavigationBar() {
  const [isAuthenticated, setIsAuthenticatied] = useState(false);
  return (
    // <div className="flex flex-row items-center gap-4 justify-between space-x-5">
    //   <Logo />
    //   <div>
    //     {" "}
    //     <input
    //       type="text"
    //       name="search"
    //       id="price"
    //       className="block w-full rounded-md borde-5 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //       placeholder="search"
    //     />
    //   </div>
    //   {!isAuthenticated ? (
    //     <div>Login in </div>
    //   ) : (
    //     <div>
    //       <ul>
    //         <li>Home</li>
    //         <li>About</li>
    //         <li>Contact</li>
    //       </ul>
    //     </div>
    //   )}
    // </div>

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
          {!isAuthenticated ? (
            <button
              type="button"
              className=" py-3 px-8 text-sm bg-primary-800 rounded-full text-white "
            >
              Login
            </button>
          ) : (
            <div>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
