"use client";
import React from "react";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-2 px-3 sm:py-4 sm:px-7 lg:py-2 lg:px-7 bg-primary-800 hover:bg-primary-700 rounded-full text-white text-sm sm:text-base lg:text-lg transition duration-200 ease-in-out"
    >
      {children}
    </button>
  );
}
