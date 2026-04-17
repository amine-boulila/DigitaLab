"use client";

import Link from "next/link";
import { Package, Plus, Tag, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { buttonStyles } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });
      const { count: categoriesCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      setStats({
        categories: categoriesCount || 0,
        products: productsCount || 0,
      });
    }

    void fetchStats();
  }, []);

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
        description="A more structured admin home with clearer stats, better spacing, and quick paths into the content areas you manage most."
        eyebrow="Overview"
        title="Dashboard"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          description="All active and draft products in your catalog."
          icon={Package}
          title="Total products"
          value={stats.products}
        />
        <AdminStatCard
          description="Category buckets used to organize the storefront."
          icon={Tag}
          title="Categories"
          value={stats.categories}
        />
        <AdminStatCard
          description="Single authenticated admin experience."
          icon={Users}
          title="Admin users"
          value={1}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Surface className="p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            Quick actions
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">
            Keep content management moving.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white"
              href="/admin/products"
            >
              <Package className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                Manage products
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review, edit, or remove products with a cleaner table layout.
              </p>
            </Link>

            <Link
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white"
              href="/admin/categories"
            >
              <Tag className="h-5 w-5 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                Manage categories
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep storefront navigation and grouping consistent.
              </p>
            </Link>
          </div>
        </Surface>

        <Surface tone="dark" className="p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Design intent
          </p>
          <h2 className="mt-4 font-display text-4xl text-white">
            Cleaner tools, same Supabase logic.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The admin experience is now aligned with the storefront design system,
            but all auth checks, queries, inserts, updates, and deletes still use
            the same Supabase flows underneath.
          </p>
        </Surface>
      </div>
    </div>
  );
}
