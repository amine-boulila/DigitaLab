import { getProductBySlug, getProducts } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductPricing } from "@/components/ProductPricing";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Surface } from "@/components/ui/surface";
import { ProductDescription } from "@/components/ProductDescription";

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

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | DigitalFun`,
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
    <div className="page-section min-h-screen">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          {product.badge && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              {product.badge}
            </span>
          )}

          <Surface className="mb-8 overflow-hidden p-8">
            {product.image_url ? (
              <Image
                alt={product.name}
                className="mx-auto max-h-105 object-contain"
                height={420}
                src={product.image_url}
                width={840}
              />
            ) : (
              <div className="flex min-h-72 items-center justify-center rounded-3xl bg-slate-50">
                <Sparkles className="h-10 w-10 text-slate-400" />
              </div>
            )}
          </Surface>

          <h1 className="text-balance mb-5 font-display text-5xl leading-none text-slate-950 md:text-6xl">
            {product.name}
          </h1>
          <ProductDescription description={product.full_description} />

          {product.features.length > 0 ? (
            <Surface tone="muted" className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-slate-950">
                Key features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Surface>
          ) : null}
        </div>

        <div className="h-fit lg:sticky lg:top-28">
          <ProductPricing product={product} />
        </div>
      </div>
    </div>
  );
}
