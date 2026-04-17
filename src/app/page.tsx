import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { buttonStyles } from "@/components/ui/button";
import { getCategories, getFeaturedProducts } from "@/lib/db";
import {
  ArrowRight,
  Globe,
  Headphones,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="pb-20">
      <Hero categories={categories} />

      <section className="page-section">
        <SectionHeading
          description="Explore the subscriptions and digital products customers choose most often, with clear pricing and fast ordering."
          eyebrow="Featured"
          title="Popular products, ready to order."
        />

        {featuredProducts.length > 0 ? (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                className={buttonStyles({ variant: "outline" })}
                href="/categories/tv-subscriptions"
              >
                Show products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-10">
            <EmptyState
              description="Featured products will appear here automatically once they have a badge or a popular pricing option."
              eyebrow="No featured products"
              icon={<Sparkles className="h-5 w-5" />}
              title="Your best offers can live here."
            />
          </div>
        )}
      </section>

      <section className="page-section pt-0">
        <SectionHeading
          align="center"
          description="Everything is built to make browsing simpler, ordering faster, and support easier to reach when you need it."
          eyebrow="Why choose us"
          title="Fast delivery, clear pricing, and reliable support."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            description="Browse products and plans without confusion or unnecessary steps."
            icon={Zap}
            title="Easy to browse"
          />
          <FeatureCard
            description="See what you get, what it costs, and how to order at a glance."
            icon={Shield}
            title="Transparent pricing"
          />
          <FeatureCard
            description="Reach us quickly through WhatsApp for questions, ordering, and delivery follow-up."
            icon={Headphones}
            title="Responsive support"
          />
          <FeatureCard
            description="Your access details or codes are delivered quickly once your order is confirmed."
            icon={Globe}
            title="Fast delivery"
          />
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Surface className="p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Browse by need
            </p>
            <h2 className="mt-4 font-display text-4xl text-slate-950">
              Find the right category quickly.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Choose the section that matches what you need and go straight to the best options.
            </p>
          </Surface>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.slice(0, 4).map((category, index) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Surface className="h-full p-6 transition hover:-translate-y-1">
                  <p className="text-sm text-slate-500">Category {index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description || "Explore curated digital products in this category."}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Surface>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pt-0">
        <Surface tone="dark" className="overflow-hidden px-8 py-10 md:px-12 md:py-14">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Ready to start
            </p>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              Get your subscription or digital product in minutes.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Choose a category, pick the plan that fits you, and contact us directly for fast confirmation and delivery.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              href="/categories/tv-subscriptions"
            >
              Browse products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Surface>
      </section>
    </div>
  );
}
