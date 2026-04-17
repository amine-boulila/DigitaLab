"use client";

import { Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import {
  FieldGroup,
  FieldLabel,
  SelectField,
  TextArea,
  TextInput,
} from "@/components/ui/form-fields";
import { Surface } from "@/components/ui/surface";
import type { Category, PriceOption } from "@/types";

export interface ProductEditorValues {
  badge: string;
  categorySlug: string;
  currentImageUrl: string | null;
  features: string[];
  fullDesc: string;
  imageFile: File | null;
  name: string;
  prices: PriceOption[];
  shortDesc: string;
  slug: string;
}

interface ProductEditorFormProps {
  categories: Category[];
  description: string;
  initialValues: ProductEditorValues;
  loading: boolean;
  submitLabel: string;
  title: string;
  onSubmit: (values: ProductEditorValues) => void | Promise<void>;
}

export function ProductEditorForm({
  categories,
  description,
  initialValues,
  loading,
  submitLabel,
  title,
  onSubmit,
}: ProductEditorFormProps) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const updateFeature = (index: number, feature: string) => {
    setValues((current) => {
      const nextFeatures = [...current.features];
      nextFeatures[index] = feature;
      return { ...current, features: nextFeatures };
    });
  };

  const updatePrice = (
    index: number,
    field: keyof PriceOption,
    nextValue: number | string | boolean | undefined
  ) => {
    setValues((current) => {
      const nextPrices = [...current.prices];
      nextPrices[index] = {
        ...nextPrices[index],
        [field]: nextValue,
      };
      return { ...current, prices: nextPrices };
    });
  };

  return (
    <form
      className="max-w-4xl space-y-8"
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

        <div className="grid gap-5 md:grid-cols-2">
          <FieldGroup>
            <FieldLabel>Product name</FieldLabel>
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
        </div>

        <div className="mt-5 grid gap-5">
          <FieldGroup>
            <FieldLabel>Category</FieldLabel>
            <SelectField
              required
              value={values.categorySlug}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  categorySlug: event.target.value,
                }))
              }
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </SelectField>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Short description</FieldLabel>
            <TextInput
              required
              value={values.shortDesc}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  shortDesc: event.target.value,
                }))
              }
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Full description</FieldLabel>
            <TextArea
              required
              rows={5}
              value={values.fullDesc}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  fullDesc: event.target.value,
                }))
              }
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel hint="Optional label shown on product cards">Badge</FieldLabel>
            <TextInput
              placeholder="Best Seller"
              value={values.badge}
              onChange={(event) =>
                setValues((current) => ({ ...current, badge: event.target.value }))
              }
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel hint="Optional">Product image</FieldLabel>
            <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-4">
              {values.currentImageUrl ? (
                <div className="mb-4 flex items-center gap-4 rounded-2xl border border-white bg-white p-3 shadow-sm">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      alt="Current product"
                      className="h-full w-full object-contain p-2"
                      src={values.currentImageUrl}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Current image</p>
                    <p className="text-xs text-slate-500">
                      Upload a new file only if you want to replace it.
                    </p>
                  </div>
                </div>
              ) : null}

              <TextInput
                accept="image/*"
                className="file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
                type="file"
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    imageFile: event.target.files?.[0] ?? null,
                  }))
                }
              />
            </div>
          </FieldGroup>
        </div>
      </Surface>

      <Surface className="p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Features</h3>
            <p className="mt-2 text-sm text-slate-500">
              Add the benefits or highlights customers should notice first.
            </p>
          </div>
          <button
            className={buttonStyles({ size: "sm", variant: "outline" })}
            type="button"
            onClick={() =>
              setValues((current) => ({
                ...current,
                features: [...current.features, ""],
              }))
            }
          >
            <Plus className="h-4 w-4" />
            Add feature
          </button>
        </div>

        <div className="space-y-3">
          {values.features.map((feature, index) => (
            <div key={`${index}-${feature}`} className="flex gap-3">
              <TextInput
                placeholder="Feature description"
                value={feature}
                onChange={(event) => updateFeature(index, event.target.value)}
              />
              <button
                aria-label={`Remove feature ${index + 1}`}
                className={buttonStyles({ size: "icon", variant: "ghost" })}
                type="button"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    features: current.features.filter((_, itemIndex) => itemIndex !== index),
                  }))
                }
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Pricing options</h3>
            <p className="mt-2 text-sm text-slate-500">
              Keep pricing simple and readable for customers and support.
            </p>
          </div>
          <button
            className={buttonStyles({ size: "sm", variant: "outline" })}
            type="button"
            onClick={() =>
              setValues((current) => ({
                ...current,
                prices: [
                  ...current.prices,
                  {
                    currency: "TND",
                    duration_label: "",
                    duration_value: "",
                    price: 0,
                  },
                ],
              }))
            }
          >
            <Plus className="h-4 w-4" />
            Add price
          </button>
        </div>

        <div className="space-y-4">
          {values.prices.map((price, index) => (
            <div
              key={`${price.duration_value}-${index}`}
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-800">
                  Option {index + 1}
                </p>
                <button
                  className="text-sm font-medium text-rose-500 transition hover:text-rose-600"
                  type="button"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      prices: current.prices.filter((_, itemIndex) => itemIndex !== index),
                    }))
                  }
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <FieldGroup className="xl:col-span-2">
                  <FieldLabel>Duration label</FieldLabel>
                  <TextInput
                    placeholder="1 Month"
                    value={price.duration_label}
                    onChange={(event) =>
                      updatePrice(index, "duration_label", event.target.value)
                    }
                  />
                </FieldGroup>

                <FieldGroup className="xl:col-span-2">
                  <FieldLabel hint="Used in WhatsApp order text">Duration value</FieldLabel>
                  <TextInput
                    placeholder="1_month"
                    value={price.duration_value}
                    onChange={(event) =>
                      updatePrice(index, "duration_value", event.target.value)
                    }
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Price</FieldLabel>
                  <TextInput
                    min={0}
                    type="number"
                    value={price.price}
                    onChange={(event) =>
                      updatePrice(index, "price", Number(event.target.value))
                    }
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Original price</FieldLabel>
                  <TextInput
                    min={0}
                    placeholder="Optional"
                    type="number"
                    value={price.original_price ?? ""}
                    onChange={(event) =>
                      updatePrice(
                        index,
                        "original_price",
                        event.target.value === ""
                          ? undefined
                          : Number(event.target.value)
                      )
                    }
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Currency</FieldLabel>
                  <TextInput
                    value={price.currency}
                    onChange={(event) =>
                      updatePrice(index, "currency", event.target.value)
                    }
                  />
                </FieldGroup>
              </div>
            </div>
          ))}
        </div>
      </Surface>

      <button className={buttonStyles({ className: "w-full", size: "lg" })} disabled={loading} type="submit">
        <Save className="h-5 w-5" />
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
