"use client"

import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { signOut } from 'next-auth/react';
import {
  Home,
  Trophy,
  Award,
  Crown,
  CalendarDays,
  Book,
  Settings,
  LogOut,
} from "lucide-react";


export default function Nav(){
  const [menuActive, setMenuActive] = useState(false);


  // ✅ Toggle dark/light theme
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

    const pathname = usePathname();

  // ✅ Toggle mobile nav menu
  function toggleMenu() {
    setMenuActive((prev) => !prev);
  }
    return (
    <nav className="bg-gray-300 dark:bg-gray-900 shadow-md px-4 py-3 flex items-center justify-between text-gray-800 dark:text-gray-100">
        <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 hover:scale-110 transition-all duration-300 hover:text-red-600 dark:hover:text-red-400">
                <Image src="/logos/new_poolLogo_oval.png" width={75}height={75} alt="UL Pool Club Logo" />
                <span className="text-lg font-bold leading-tight group relative">
                    UL Pool Club
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>

                </span>
            </Link>
        </div>

        {/* Hamburger for Mobile */}

        <div className="flex items-center space-x-4 md:hidden">

        <button onClick={toggleMenu} className="flex flex-col space-y-1">
            <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></span>
            <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></span>
            <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></span>
        </button>

        </div>

        {/* Nav Links for Desktop & Mobile */}

        <ul id="navLinks" className="hidden md:flex space-x-6 items-center font-medium">
            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 ${pathname === "/" ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <Home className="inline-block w-5 h-5 mr-1" />

                    Home
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>
            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/league" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 ${pathname === "/league" ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <Trophy className="inline-block w-5 h-5 mr-1" />
                    League
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>
            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/tournaments" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 ${pathname === "/tournaments" ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <Award className="inline-block w-5 h-5 mr-1" />
                    Tournaments
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>
            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/rankings" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 ${pathname === "/rankings" ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <Crown className="inline-block w-5 h-5 mr-1" />
                    Rankings
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>
            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/schedule" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 ${pathname === "/schedule" ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <CalendarDays className="inline-block w-5 h-5 mr-1" />
                    Schedule
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>
            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/rules" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 ${pathname === "/rules" ? 'text-red-600 dark:text-red-400' : ''}`}>
                    <Book className="inline-block w-5 h-5 mr-1" />
                    Rules
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>

            {/* TODO: IsAdmin? for Admin Panel */}

            <li className="group relative hover:scale-110 transition-scale duration-300">
                <Link href="/admin" className={`hover:text-red-600 dark:hover:text-red-400 transition-text duration-300`}>
                    <Settings className="inline-block w-5 h-5 mr-1" />
                    Admin Panel
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
            </li>

            <li className="group relative hover:scale-110 transition-scale duration-300">
                <button onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                className="flex items-center text-inherit hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 cursor-pointer">
                <LogOut className="inline-block w-5 h-5 mr-1" />
                Logout
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </button>
            </li>
        </ul>
    </nav>
    );
}