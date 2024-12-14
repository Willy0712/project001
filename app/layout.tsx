import React from "react";
import NavigationBar from "@/app/_components/NavigationBar";
import "@/app/_styles/globals.css";
import { Nunito } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal"],
});
console.log(nunito);

export const metaData = {
  title: {
    template: "%s | Postyy",
    default: "welcome to Postyy",
  },
  description: "An app for sharing news to be verified",
};

export default function RootLAyout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-gray-50 text-textColor`}>
        <NavigationBar />
        <main>{children}</main>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
