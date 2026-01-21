import { Category, Product } from "@/types";
import { supabase } from "./supabase";

// Fallback static data (existing data from data.ts)
// We keep this so the app doesn't break while you set up the DB
import { categories as staticCategories, products as staticProducts } from "./data";

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error || !data || data.length === 0) throw error;
    return data;
  } catch (e) {
    console.warn("Fetching categories from DB failed, using static data:", e);
    return staticCategories;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error || !data || data.length === 0) throw error;
    
    // Map DB result to Product type if needed (e.g. if field names differ)
    // Here we assume 1:1 mapping mostly, but we might need to handle 'category' vs 'category_slug'
    return data.map((p: any) => ({
      ...p,
      category: p.category_slug, // map foreign key to our type's expected field
    }));
  } catch (e) {
    console.warn("Fetching products from DB failed, using static data:", e);
    return staticProducts;
  }
}

// Update helper functions to use the async getters
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.badge || p.prices.some(pr => pr.popular)).slice(0, 4);
}
