"use client";

import Link from 'next/link';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span>DigitaLab</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Home
          </Link>
          {categories.slice(0, 5).map((category) => (
             <Link 
               key={category.id}
               href={`/categories/${category.slug}`} 
               className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
             >
               {category.name}
             </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           {/* Mobile Menu Trigger */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="md:hidden text-gray-300 hover:text-white"
           >
             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full border-b border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
             <Link 
               href="/" 
               className="text-sm font-medium text-gray-300 hover:text-white"
               onClick={() => setIsMenuOpen(false)}
             >
               Home
             </Link>
             {categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/categories/${category.slug}`} 
                  className="text-sm font-medium text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
             ))}
          </nav>
        </div>
      )}
    </header>
  );
}
