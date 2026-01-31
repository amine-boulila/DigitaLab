import Link from 'next/link';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { getCategories } from '@/lib/db';

export async function Hero() {
  const categories = await getCategories();
  const tvCategory = categories.find(c => c.slug === 'tv-subscriptions') || categories[0];
  const giftCardCategory = categories.find(c => c.slug === 'gift-cards') || categories[1];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-background to-background" />
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          Welcome to the Future of Digital Entertainment
        </div>

        <h1 className="gradient-text mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Premium DigitalFun <br /> Products Instantly
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
          Unlock a world of entertainment with our top-tier IPTV subscriptions, gift cards, and software keys. Delivered instantly via WhatsApp.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {tvCategory && (
            <Link
              href={`/categories/${tvCategory.slug}`}
              className="group glow-cyan flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:from-cyan-400 hover:to-blue-400"
            >
              <Play className="h-4 w-4 fill-white" />
              {tvCategory.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          
          {giftCardCategory && (
            <Link
              href={`/categories/${giftCardCategory.slug}`}
              className="glass group flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              {giftCardCategory.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        
        {/* Enhanced trust markers */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-400">
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
             Instant Delivery
           </div>
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
             24/7 Support via WhatsApp
           </div>
           <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
             Secure & Anonymous
           </div>
        </div>
      </div>
    </section>
  );
}
