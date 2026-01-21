"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Category } from "@/types"; // Using your shared types

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*');
    if (data) {
        setCategories(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category? Products in this category might be affected.")) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
    } else {
        alert("Error deleting category");
    }
  }

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <Link 
          href="/admin/categories/new"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-bold text-white transition-colors hover:bg-indigo-500"
        >
          <Plus className="h-5 w-5" />
          Add Category
        </Link>
      </div>

      <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input 
            type="text"
            placeholder="Search categories..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-500 outline-none focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading categories...</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Slug</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Description</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{category.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400">
                      {category.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       {/* Edit functionality not implemented yet, just visual */}
                      <Link 
                        href={`/admin/categories/edit/${category.id}`} 
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                  <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No categories found.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
