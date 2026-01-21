"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newCategory = {
      name,
      slug: slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      description,
    };

    const { error } = await supabase.from('categories').insert([newCategory]);

    if (error) {
      alert("Error creating category: " + error.message);
    } else {
      router.push("/admin/categories");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">Create New Category</h1>
      
      <form onSubmit={handleCreate} className="max-w-2xl space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Category Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Slug (Auto-generated if empty)</label>
                <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Description</label>
                <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>
        </div>

        <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-indigo-500 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
