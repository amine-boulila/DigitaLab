"use client";

import Link from "next/link";
import { Edit, Package, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTableCard } from "@/components/admin/AdminTableCard";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { TextInput } from "@/components/ui/form-fields";
import { Surface } from "@/components/ui/surface";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    if (data) {
      const mappedProducts = (
        data as Array<Omit<Product, "category"> & { category_slug: string }>
      ).map((product) => ({
        ...product,
        category: product.category_slug,
      }));
      setProducts(mappedProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    void loadProducts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter((product) => product.id !== id));
    } else {
      alert("Error deleting product");
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        action={
          <Link
            className={buttonStyles({ variant: "secondary" })}
            href="/admin/products/new"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        }
        description="Manage the product catalog with improved search, stronger table hierarchy, and calmer editing affordances."
        eyebrow="Catalog"
        title="Products"
      />

      <Surface className="p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput
            className="pl-11"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </Surface>

      {loading ? (
        <Surface className="p-6 text-sm text-slate-500">Loading products...</Surface>
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          description="Products will show up here once they are created. Search is also applied to this view."
          eyebrow="No matching products"
          icon={<Package className="h-5 w-5" />}
          title="Nothing to show right now."
        />
      ) : (
        <AdminTableCard
          description="A cleaner overview of pricing complexity, category placement, and edit actions."
          title="Product list"
        >
          <table className="min-w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Pricing
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="bg-white/70">
                  <td className="px-6 py-5">
                    <div className="font-medium text-slate-950">{product.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{product.slug}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">
                    {product.prices.length} options
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        className={buttonStyles({ size: "icon", variant: "outline" })}
                        href={`/admin/products/edit/${product.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className={buttonStyles({ size: "icon", variant: "ghost" })}
                        type="button"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-rose-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTableCard>
      )}
    </div>
  );
}
