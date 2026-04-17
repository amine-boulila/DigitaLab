import { getProductsByCategory, getCategories } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Box } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="page-section min-h-screen">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link className="transition hover:text-slate-950" href="/">
          Home
        </Link>
        <span>/</span>
        <span>{category.name}</span>
      </div>
      <SectionHeading
        description={
          category.description ||
          "Explore the products available in this category and choose the option that fits you best."
        }
        eyebrow="Category"
        title={category.name}
      />

      {products.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            description="Add products to this category and they will appear here automatically."
            eyebrow="No products"
            icon={<Box className="h-5 w-5" />}
            title="Nothing is live in this category yet."
          />
        </div>
      )}
    </div>
  );
}
