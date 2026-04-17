"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import {
  FieldGroup,
  FieldLabel,
  TextArea,
  TextInput,
} from "@/components/ui/form-fields";
import { Surface } from "@/components/ui/surface";

export interface CategoryEditorValues {
  description: string;
  name: string;
  slug: string;
}

interface CategoryEditorFormProps {
  description: string;
  initialValues: CategoryEditorValues;
  loading: boolean;
  submitLabel: string;
  title: string;
  onSubmit: (values: CategoryEditorValues) => void | Promise<void>;
}

export function CategoryEditorForm({
  description,
  initialValues,
  loading,
  submitLabel,
  title,
  onSubmit,
}: CategoryEditorFormProps) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form
      className="max-w-3xl space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit(values);
      }}
    >
      <Surface className="p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>

        <div className="grid gap-5">
          <FieldGroup>
            <FieldLabel>Category name</FieldLabel>
            <TextInput
              required
              value={values.name}
              onChange={(event) =>
                setValues((current) => ({ ...current, name: event.target.value }))
              }
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel hint="Optional, auto-generated if left empty">Slug</FieldLabel>
            <TextInput
              value={values.slug}
              onChange={(event) =>
                setValues((current) => ({ ...current, slug: event.target.value }))
              }
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Description</FieldLabel>
            <TextArea
              required
              rows={5}
              value={values.description}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </FieldGroup>
        </div>
      </Surface>

      <button className={buttonStyles({ className: "w-full", size: "lg" })} disabled={loading} type="submit">
        <Save className="h-5 w-5" />
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
