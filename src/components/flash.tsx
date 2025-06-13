'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Optional icon, if using Lucide

type FlashProps = {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  close?: boolean; // default: true
};


export default function Flash({ children, type = 'info', duration, close = true }: FlashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
  if (duration !== undefined) {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }
}, [duration]);



  if (!visible) return null;

  const colorMap = {
    success: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800 dark:text-yellow-100',
    info: 'bg-blue-100 text-blue-800 border-blue-300 ',
  };

   return (
    <div
  className={`relative top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 border rounded-md shadow-md transition-all duration-300 ${colorMap[type]}`}
>
  <div className={`flex items-center gap-4 ${close ? 'justify-between' : 'justify-center'}`}>
    <div className="text-center text-sm font-medium">{children}</div>

    {close && (
      <button
        onClick={() => setVisible(false)}
        className="text-inherit hover:opacity-70 transition"
      >
        <X className="w-4 h-4 cursor-pointer" />
      </button>
    )}
  </div>
</div>

  );
}