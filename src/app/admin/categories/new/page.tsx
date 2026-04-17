"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CategoryEditorForm } from "@/components/admin/CategoryEditorForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        description="Create a category with the same cleaner form system used across the admin area."
        eyebrow="Create"
        title="New category"
      />

      <CategoryEditorForm
        description="Set the category name, slug, and description. Slugs can be auto-generated if you leave them blank."
        initialValues={{ description: "", name: "", slug: "" }}
        loading={loading}
        submitLabel="Create category"
        title="Category details"
        onSubmit={async (values) => {
          setLoading(true);

          const newCategory = {
            description: values.description,
            name: values.name,
            slug: values.slug || slugify(values.name),
          };

          const { error } = await supabase.from("categories").insert([newCategory]);

          if (error) {
            alert("Error creating category: " + error.message);
          } else {
            router.push("/admin/categories");
          }
          setLoading(false);
        }}
      />
    </div>
  );
}
