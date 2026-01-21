import { getProductsByCategory, getCategories } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

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
    <div className="container mx-auto min-h-screen px-4 py-12">
      <header className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{category.name}</h1>
        <p className="max-w-2xl text-lg text-gray-400">{category.description}</p>
      </header>
      
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-center">
          <p className="text-lg font-medium text-gray-400">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
