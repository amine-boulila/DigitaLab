import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-cyan-500/20 bg-black/40 py-12 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">DigitalFun</h3>
            <p className="text-sm text-gray-400">
              Premium digital products delivered instantly. Secure, fast, and reliable.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-cyan-400">Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/categories/tv-subscriptions" className="transition-colors hover:text-cyan-400">TV Subscriptions</Link></li>
              <li><Link href="/categories/gift-cards" className="transition-colors hover:text-cyan-400">Gift Cards</Link></li>
              <li><Link href="/categories/software" className="transition-colors hover:text-cyan-400">Software</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-purple-400">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/faq" className="transition-colors hover:text-purple-400">FAQ</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-purple-400">Contact Us</Link></li>
              <li><Link href="/how-it-works" className="transition-colors hover:text-purple-400">How it Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-orange-400">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 transition-all hover:text-cyan-400 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 transition-all hover:text-purple-400 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 transition-all hover:text-orange-400 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-cyan-500/20 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DigitalFun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
