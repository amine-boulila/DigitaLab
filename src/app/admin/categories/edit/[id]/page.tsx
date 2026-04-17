"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import {
  CategoryEditorForm,
  type CategoryEditorValues,
} from "@/components/admin/CategoryEditorForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Surface } from "@/components/ui/surface";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialValues, setInitialValues] = useState<CategoryEditorValues>({
    description: "",
    name: "",
    slug: "",
  });

  useEffect(() => {
    async function fetchCategory() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Error fetching category");
        router.push("/admin/categories");
        return;
      }

      if (data) {
        setInitialValues({
          description: data.description || "",
          name: data.name,
          slug: data.slug,
        });
      }
      setLoading(false);
    }

    void fetchCategory();
  }, [id, router]);

  if (loading) {
    return <Surface className="p-6 text-sm text-slate-500">Loading category...</Surface>;
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        description="Update the category name, slug, and description without changing any underlying Supabase behavior."
        eyebrow="Edit"
        title="Edit category"
      />

      <CategoryEditorForm
        description="Keep category information clear so navigation and grouping remain consistent across the storefront."
        initialValues={initialValues}
        loading={saving}
        submitLabel="Update category"
        title="Category details"
        onSubmit={async (values) => {
          setSaving(true);

          const updatedCategory = {
            description: values.description,
            name: values.name,
            slug: values.slug || slugify(values.name),
          };

          const { error } = await supabase
            .from("categories")
            .update(updatedCategory)
            .eq("id", id);

          if (error) {
            alert("Error updating category: " + error.message);
          } else {
            router.push("/admin/categories");
          }
          setSaving(false);
        }}
      />
    </div>
  );
}
