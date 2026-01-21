import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-12 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">DigitaLab</h3>
            <p className="text-sm text-gray-400">
              Premium digital products delivered instantly. Secure, fast, and reliable.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-500">Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/categories/tv-subscriptions" className="hover:text-white">TV Subscriptions</Link></li>
              <li><Link href="/categories/gift-cards" className="hover:text-white">Gift Cards</Link></li>
              <li><Link href="/categories/software" className="hover:text-white">Software</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-500">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How it Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-500">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DigitaLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
