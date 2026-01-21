import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { getFeaturedProducts } from "@/lib/db";
import { Shield, Zap, Headphones, Globe } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Featured Products</h2>
              <p className="mt-2 text-gray-400">Our most popular and best-rated subscriptions</p>
            </div>
            <Link href="/categories/tv-subscriptions" className="hidden sm:flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
             <Link href="/categories/tv-subscriptions" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
      </section>

      {/* Value Proposition / Features */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
            <p className="mt-4 text-gray-400">We provide the best service in the market with instant delivery.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard 
              icon={Zap}
              title="Instant Delivery"
              description="Receive your credentials via WhatsApp immediately after purchase."
            />
            <FeatureCard 
              icon={Shield}
              title="Secure Payment"
              description="We use secure and anonymous payment methods for your privacy."
            />
            <FeatureCard 
              icon={Headphones}
              title="24/7 Support"
              description="Our specialized team is available round the clock to assist you."
            />
            <FeatureCard 
              icon={Globe}
              title="Global Access"
              description="Access our services from anywhere in the world without restrictions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 text-center">
        <div className="rounded-3xl bg-indigo-600 px-6 py-16 md:px-12 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/50 via-transparent to-transparent" />
           
           <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Ready to get started?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-indigo-100">
                Join thousands of satisfied customers and upgrade your entertainment experience today.
              </p>
              <Link 
                href="/categories/tv-subscriptions"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-indigo-600 transition-transform hover:scale-105"
              >
                Browse Products
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
