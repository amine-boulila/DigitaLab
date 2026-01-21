import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { getCategories } from '@/lib/db';

export async function Hero() {
  const categories = await getCategories();
  const tvCategory = categories.find(c => c.slug === 'tv-subscriptions') || categories[0];
  const giftCardCategory = categories.find(c => c.slug === 'gift-cards') || categories[1];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mx-auto mb-6 max-w-4xl bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
          Premium Digital <br /> Products Instantly
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">
          Unlock a world of entertainment with our top-tier IPTV subscriptions, gift cards, and software keys. Delivered instantly via WhatsApp.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {tvCategory && (
            <Link
              href={`/categories/${tvCategory.slug}`}
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200"
            >
              <Play className="h-4 w-4 fill-black" />
              {tvCategory.name}
            </Link>
          )}
          
          {giftCardCategory && (
            <Link
              href={`/categories/${giftCardCategory.slug}`}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              {giftCardCategory.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        
        {/* Trust markers */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500" />
             Instant Delivery
           </div>
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500" />
             24/7 Support via WhatsApp
           </div>
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500" />
             Secure & Anonymous
           </div>
        </div>
      </div>
    </section>
  );
}
