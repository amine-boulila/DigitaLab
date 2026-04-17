"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

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

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialValues, setInitialValues] =
    useState<ProductEditorValues>(defaultProductValues);

  useEffect(() => {
    async function fetchData() {
      const { data: categoryData } = await supabase.from("categories").select("*");
      if (categoryData) setCategories(categoryData);

      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !product) {
        alert("Error fetching product");
        router.push("/admin/products");
        return;
      }

      setInitialValues({
        badge: product.badge || "",
        categorySlug: product.category_slug || "",
        currentImageUrl: product.image_url || null,
        features: product.features || [""],
        fullDesc: product.full_description || "",
        imageFile: null,
        name: product.name,
        prices: product.prices || defaultProductValues.prices,
        shortDesc: product.short_description || "",
        slug: product.slug,
      });

      setLoading(false);
    }

    void fetchData();
  }, [id, router]);

  if (loading) {
    return <Surface className="p-6 text-sm text-slate-500">Loading product...</Surface>;
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        description="Edit existing products with the same reusable product editor used on the create screen."
        eyebrow="Edit"
        title="Edit product"
      />

      <ProductEditorForm
        categories={categories}
        description="Update content, pricing, features, and imagery without changing the existing Supabase update flow."
        initialValues={initialValues}
        loading={saving}
        submitLabel="Update product"
        title="Product details"
        onSubmit={async (values) => {
          setSaving(true);

          let imageUrl = values.currentImageUrl;

          if (values.imageFile) {
            const fileExt = values.imageFile.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from("products")
              .upload(filePath, values.imageFile);

            if (uploadError) {
              alert("Error uploading image: " + uploadError.message);
              setSaving(false);
              return;
            }

            const {
              data: { publicUrl },
            } = supabase.storage.from("products").getPublicUrl(filePath);
            imageUrl = publicUrl;
          }

          const updatedProduct = {
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

          const { error } = await supabase
            .from("products")
            .update(updatedProduct)
            .eq("id", id);

          if (error) {
            alert("Error updating product: " + error.message);
          } else {
            router.push("/admin/products");
          }
          setSaving(false);
        }}
      />
    </div>
  );
}
