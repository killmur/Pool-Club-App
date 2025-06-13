import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import Nav from "../../components/nav";
import {FontAwesome, DarkMode} from "../../components/head";
import { AltDarkMode } from "@/components/toast";

let darkMode = false;
try{
  const stringDark = localStorage.getItem("darkMode");
  const darkMode = stringDark === "true";
} catch (err) {
  const darkMode = false;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UL Pool Club",
  description: "University of Limerick Pool Club for Members",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
      <DarkMode />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} dark:text-white transition-colors duration-300 bg-gray-100 dark:bg-gray-600`} >
        <Nav />
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
      <AltDarkMode />
      </body>
    </html>
  );
}
