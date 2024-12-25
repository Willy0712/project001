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
      className="py-4 px-12 bg-primary-800 hover:bg-primary-700 rounded-full text-white"
    >
      {children}
    </button>
  );
}
