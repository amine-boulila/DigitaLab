"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import Image from 'next/image';

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-black/30 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2 text-xl font-bold tracking-tighter text-white transition-all hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden ring-2 ring-cyan-500/50 transition-all group-hover:ring-cyan-400">
            <Image src="/logo.png" alt="DigitalFun Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">DigitalFun</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400">
            Home
          </Link>
          {categories.slice(0, 5).map((category) => (
             <Link 
               key={category.id}
               href={`/categories/${category.slug}`} 
               className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400"
             >
               {category.name}
             </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           {/* Mobile Menu Trigger */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
           >
             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full border-b border-cyan-500/20 bg-black/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
             <Link 
               href="/" 
               className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
               onClick={() => setIsMenuOpen(false)}
             >
               Home
             </Link>
             {categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/categories/${category.slug}`} 
                  className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
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
