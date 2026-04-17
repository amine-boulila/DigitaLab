import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import type { Category } from "@/types";

interface HeroProps {
  categories: Category[];
}

export function Hero({ categories }: HeroProps) {
  const featuredCategory =
    categories.find((category) => category.slug === "tv-subscriptions") ??
    categories[0];

  return (
    <section className="shell-container relative flex min-h-[calc(100vh-5.5rem)] items-center overflow-hidden pb-12 pt-12 md:pb-16 md:pt-16">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <div className="hero-animate-in mx-auto w-full max-w-5xl text-center">
        <div className="hero-animate-in hero-delay-1 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Premium digital products with instant delivery
        </div>

        <h1 className="hero-animate-in hero-delay-2 text-balance mt-6 font-display text-5xl leading-none text-slate-950 md:text-7xl xl:text-[6rem]">
          Premium entertainment starts here.
        </h1>
        <p className="hero-animate-in hero-delay-3 mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
          Discover TV subscriptions, gift cards, and digital products with fast support and simple ordering.
        </p>

        {featuredCategory ? (
          <div className="hero-animate-in hero-delay-4 mt-8">
            <Link
              className={buttonStyles({
                className:
                  "hero-cta-pulse h-16 px-10 text-lg shadow-[0_26px_60px_-22px_rgba(15,23,42,0.55)]",
                size: "lg",
              })}
              href={`/categories/${featuredCategory.slug}`}
            >
              Browse TV Subscriptions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}

        <div className="hero-animate-in hero-delay-5 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          <span>Instant delivery</span>
          <span>24/7 support</span>
          <span>Simple ordering</span>
        </div>
      </div>
    </section>
  );
}
