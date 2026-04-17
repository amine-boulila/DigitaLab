"use client";

import Link from "next/link";
import { Edit, Plus, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTableCard } from "@/components/admin/AdminTableCard";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { TextInput } from "@/components/ui/form-fields";
import { Surface } from "@/components/ui/surface";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
    };

    void loadCategories();
  }, []);

  async function handleDelete(id: string) {
    if (
      !confirm(
        "Are you sure you want to delete this category? Products in this category might be affected."
      )
    ) {
      return;
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      setCategories(categories.filter((category) => category.id !== id));
    } else {
      alert("Error deleting category");
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        action={
          <Link
            className={buttonStyles({ variant: "secondary" })}
            href="/admin/categories/new"
          >
            <Plus className="h-4 w-4" />
            Add category
          </Link>
        }
        description="Keep navigation and grouping tidy with a more readable category management table."
        eyebrow="Structure"
        title="Categories"
      />

      <Surface className="p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput
            className="pl-11"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </Surface>

      {loading ? (
        <Surface className="p-6 text-sm text-slate-500">Loading categories...</Surface>
      ) : filteredCategories.length === 0 ? (
        <EmptyState
          description="Create categories to shape storefront navigation and organize your products."
          eyebrow="No matching categories"
          icon={<Tag className="h-5 w-5" />}
          title="Nothing to show right now."
        />
      ) : (
        <AdminTableCard
          description="Cleaner labels and spacing make it easier to scan names, slugs, and descriptions."
          title="Category list"
        >
          <table className="min-w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Slug
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Description
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="bg-white/70">
                  <td className="px-6 py-5 font-medium text-slate-950">
                    {category.name}
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {category.slug}
                    </span>
                  </td>
                  <td className="max-w-sm px-6 py-5 text-sm text-slate-500">
                    {category.description}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        className={buttonStyles({ size: "icon", variant: "outline" })}
                        href={`/admin/categories/edit/${category.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className={buttonStyles({ size: "icon", variant: "ghost" })}
                        type="button"
                        onClick={() => handleDelete(category.id)}
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
