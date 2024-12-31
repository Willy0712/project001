import React from "react";
import NavigationBar from "@/app/_components/NavigationBar";
import "@/app/_styles/globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import { Metadata } from "next";
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal"],
});
console.log(nunito);

export const metadata = {
  title: {
    template: "%s  factproovers",
    default: "Welcome / Factproovers",
    description:
      "Factproovers is a platform that allows users to share news and verify the authenticity of news shared by other users.",
  },
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
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
