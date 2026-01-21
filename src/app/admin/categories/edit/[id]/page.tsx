"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { use } from "react";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        alert("Error fetching category");
        router.push("/admin/categories");
        return;
      }

      if (data) {
        setName(data.name);
        setSlug(data.slug);
        setDescription(data.description || "");
      }
      setLoading(false);
    }
    fetchCategory();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updatedCategory = {
      name,
      slug: slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      description,
    };

    const { error } = await supabase
      .from('categories')
      .update(updatedCategory)
      .eq('id', id);

    if (error) {
      alert("Error updating category: " + error.message);
    } else {
      router.push("/admin/categories");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">Edit Category</h1>
      
      <form onSubmit={handleUpdate} className="max-w-2xl space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Category Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Slug</label>
                <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Description</label>
                <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>
        </div>

        <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-indigo-500 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? "Saving..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}
