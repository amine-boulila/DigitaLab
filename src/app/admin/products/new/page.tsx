"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ProductEditorForm,
  type ProductEditorValues,
} from "@/components/admin/ProductEditorForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Surface } from "@/components/ui/surface";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import type { Category } from "@/types";

const defaultProductValues: ProductEditorValues = {
  badge: "",
  categorySlug: "",
  currentImageUrl: null,
  features: [""],
  fullDesc: "",
  imageFile: null,
  name: "",
  prices: [
    {
      currency: "TND",
      duration_label: "1 Month",
      duration_value: "1_month",
      price: 10,
    },
  ],
  shortDesc: "",
  slug: "",
};

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*");
      if (data) setCategories(data);
      setCategoriesLoading(false);
    }

    void fetchCategories();
  }, []);

  if (categoriesLoading) {
    return <Surface className="p-6 text-sm text-slate-500">Loading form...</Surface>;
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        description="Add new products with a single reusable editor for content, features, pricing, and media."
        eyebrow="Create"
        title="New product"
      />

      <ProductEditorForm
        categories={categories}
        description="All storefront product fields are grouped into one maintainable editor so the create and edit experiences stay consistent."
        initialValues={defaultProductValues}
        loading={loading}
        submitLabel="Create product"
        title="Product details"
        onSubmit={async (values) => {
          setLoading(true);

          let imageUrl = null;

          if (values.imageFile) {
            const fileExt = values.imageFile.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from("products")
              .upload(filePath, values.imageFile);

            if (uploadError) {
              alert("Error uploading image: " + uploadError.message);
              setLoading(false);
              return;
            }

            const {
              data: { publicUrl },
            } = supabase.storage.from("products").getPublicUrl(filePath);
            imageUrl = publicUrl;
          }

          const newProduct = {
            badge: values.badge || null,
            category_slug: values.categorySlug,
            features: values.features.filter((feature) => feature.trim() !== ""),
            full_description: values.fullDesc,
            image_url: imageUrl,
            name: values.name,
            prices: values.prices,
            short_description: values.shortDesc,
            slug: values.slug || slugify(values.name),
          };

          const { error } = await supabase.from("products").insert([newProduct]);

          if (error) {
            alert("Error creating product: " + error.message);
          } else {
            router.push("/admin/products");
          }
          setLoading(false);
        }}
      />
    </div>
  );
}
