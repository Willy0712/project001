import React from "react";
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {currentYear} BnB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
