"use client"

export function AltDarkMode(){
    function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    };
    return (
    <button onClick={toggleTheme} className="bg-gray-300 dark:bg-gray-800 rounded-full p-2 text-xl cursor-pointer group fixed hover:text-red-600 dark:hover:text-red-400 transition-text duration-300 bottom-4 right-4">
                <i className="fa-solid fa-moon dark:hidden"></i>
                <i className="fa-solid fa-sun hidden dark:inline"></i>
    </button>
    )
}