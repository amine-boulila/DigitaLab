"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Category, PriceOption } from "@/types";
import { Save, Plus, X } from "lucide-react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [badge, setBadge] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [prices, setPrices] = useState<PriceOption[]>([
    { duration_label: "1 Month", duration_value: "1 month", price: 10, currency: "TND" }
  ]);

  useEffect(() => {
    async function fetchData() {
        // Fetch Categories
        const { data: cats } = await supabase.from('categories').select('*');
        if (cats) setCategories(cats);

        // Fetch Product
        const { data: prod, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !prod) {
            alert("Error fetching product");
            router.push("/admin/products");
            return;
        }

        setName(prod.name);
        setSlug(prod.slug);
        setShortDesc(prod.short_description || "");
        setFullDesc(prod.full_description || "");
        setCategorySlug(prod.category_slug || "");
        setFeatures(prod.features || [""]);
        setBadge(prod.badge || "");
        setPrices(prod.prices || []);
        setCurrentImageUrl(prod.image_url);
        
        setLoading(false);
    }
    fetchData();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = currentImageUrl;

    if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, imageFile);

        if (uploadError) {
             alert("Error uploading image: " + uploadError.message);
             setSaving(false);
             return;
        }

        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filePath);
        imageUrl = publicUrl;
    }

    const updatedProduct = {
      name,
      slug: slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      short_description: shortDesc,
      full_description: fullDesc,
      category_slug: categorySlug,
      features: features.filter(f => f.trim() !== ""),
      prices,
      badge: badge || null,
      image_url: imageUrl,
    };

    const { error } = await supabase.from('products').update(updatedProduct).eq('id', id);

    if (error) {
      alert("Error updating product: " + error.message);
    } else {
      router.push("/admin/products");
    }
    setSaving(false);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

  const updatePrice = (index: number, field: keyof PriceOption, value: any) => {
    const newPrices = [...prices];
    (newPrices[index] as any)[field] = value;
    setPrices(newPrices);
  };

  const addPrice = () => setPrices([...prices, { duration_label: "", duration_value: "", price: 0, currency: "TND" }]);
  const removePrice = (index: number) => setPrices(prices.filter((_, i) => i !== index));

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">Edit Product</h1>
      
      <form onSubmit={handleUpdate} className="max-w-3xl space-y-8">
        
        {/* Basic Info */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
            <h3 className="text-xl font-bold text-white">Basic Information</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">Product Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">Slug</label>
                    <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Category</label>
                <select required value={categorySlug} onChange={e => setCategorySlug(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500">
                    <option value="">Select a Category</option>
                    {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Short Description</label>
                <input required value={shortDesc} onChange={e => setShortDesc(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Full Description</label>
                <textarea required rows={4} value={fullDesc} onChange={e => setFullDesc(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" />
            </div>

            <div className="space-y-4">
                <label className="mb-1 block text-sm font-medium text-gray-400">Product Image (Optional)</label>
                
                {currentImageUrl && (
                    <div className="mb-2">
                         <img src={currentImageUrl} alt="Current" className="h-20 w-20 object-contain rounded-lg border border-white/10 bg-black/50" />
                         <p className="text-xs text-gray-500 mt-1">Current Image</p>
                    </div>
                )}

                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500 file:mr-4 file:rounded-lg file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:border-0 hover:file:bg-indigo-500" 
                />
            </div>

             <div>
                <label className="mb-1 block text-sm font-medium text-gray-400">Badge (Optional)</label>
                <input value={badge} onChange={e => setBadge(e.target.value)} className="w-full rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" placeholder="e.g. Best Seller" />
            </div>
        </div>

        {/* Features */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
            <h3 className="text-xl font-bold text-white">Features</h3>
            {features.map((feature, i) => (
                <div key={i} className="flex gap-2">
                    <input 
                        value={feature} 
                        onChange={e => updateFeature(i, e.target.value)} 
                        className="flex-1 rounded-lg bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-indigo-500" 
                        placeholder="Feature description"
                    />
                    <button type="button" onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:text-red-300"><X className="h-5 w-5"/></button>
                </div>
            ))}
            <button type="button" onClick={addFeature} className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300">
                <Plus className="h-4 w-4" /> Add Feature
            </button>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
            <h3 className="text-xl font-bold text-white">Pricing Options</h3>
            {prices.map((price, i) => (
                <div key={i} className="grid gap-4 sm:grid-cols-6 items-end border-b border-white/5 pb-4 mb-4">
                     <div className="sm:col-span-2">
                        <label className="text-xs text-gray-500">Duration Label</label>
                        <input value={price.duration_label} onChange={e => updatePrice(i, 'duration_label', e.target.value)} className="w-full rounded bg-black/50 border border-white/10 p-2 text-white text-sm" placeholder="1 Month"/>
                     </div>
                     <div className="sm:col-span-2">
                        <label className="text-xs text-gray-500">Value (for msg)</label>
                        <input value={price.duration_value} onChange={e => updatePrice(i, 'duration_value', e.target.value)} className="w-full rounded bg-black/50 border border-white/10 p-2 text-white text-sm" placeholder="1_month"/>
                     </div>
                     <div>
                        <label className="text-xs text-gray-500">Price</label>
                        <input type="number" value={price.price} onChange={e => updatePrice(i, 'price', Number(e.target.value))} className="w-full rounded bg-black/50 border border-white/10 p-2 text-white text-sm"/>
                     </div>
                     <div>
                        <label className="text-xs text-gray-500">Original Price (opt)</label>
                        <input type="number" value={price.original_price || ''} onChange={e => updatePrice(i, 'original_price', Number(e.target.value))} className="w-full rounded bg-black/50 border border-white/10 p-2 text-white text-sm" placeholder="e.g 60"/>
                     </div>
                     <div className="sm:col-start-6 flex justify-end">
                        <button type="button" onClick={() => removePrice(i)} className="text-red-400 text-sm hover:underline">Remove</button>
                     </div>
                </div>
            ))}
            <button type="button" onClick={addPrice} className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300">
                <Plus className="h-4 w-4" /> Add Price Option
            </button>
        </div>

        <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-indigo-500 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? "Updating..." : "Update Product"}
        </button>

      </form>
    </div>
  );
}
