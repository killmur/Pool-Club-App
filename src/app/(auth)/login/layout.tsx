import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../../styles/globals.css";
import {FontAwesome, DarkMode} from "../../../components/head";
import { AltDarkMode } from "../../../components/toast"

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
  title: "Login",
  description: "Login to the UL Pool Club Member's Website",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
      <DarkMode />
      <FontAwesome />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} dark:text-white transition-colors duration-300 bg-gray-100 dark:bg-gray-600`} >
      <div className="min-h-screen flex items-center justify-center px-4">
      <div className="container max-w-lg md:my-5 my-10 w-full">
        {children}
      </div>
      </div>
      <AltDarkMode />
      </body>
    </html>
  );
}
