import { getProductBySlug, getProducts } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductPricing } from "@/components/ProductPricing";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  
  return {
    title: `${product.name} | DigitaLab`,
    description: product.short_description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 lg:py-12">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Product Info */}
        <div>
          {product.badge && (
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
          
          {product.image_url && (
            <div className="mb-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8">
               <img 
                 src={product.image_url} 
                 alt={product.name} 
                 className="mx-auto max-h-[400px] object-contain"
               />
            </div>
          )}

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            {product.name}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-300">
            {product.full_description}
          </p>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-bold text-white">Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-indigo-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Pricing & CTA */}
        <div className="lg:sticky lg:top-24 h-fit">
          <ProductPricing product={product} />
        </div>
      </div>
    </div>
  );
}
