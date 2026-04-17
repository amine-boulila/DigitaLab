"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PriceOption } from "@/types";

interface DurationSelectorProps {
  onSelect: (option: PriceOption) => void;
  options: PriceOption[];
  selectedOption: PriceOption;
}

export function DurationSelector({
  onSelect,
  options,
  selectedOption,
}: DurationSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected =
          selectedOption.duration_value === option.duration_value;
        const discount = option.original_price
          ? Math.round(
              ((option.original_price - option.price) / option.original_price) *
                100
            )
          : 0;

        return (
          <button
            key={option.duration_value}
            className={cn(
              "relative rounded-[24px] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40",
              isSelected
                ? "border-slate-950 bg-slate-950 text-white shadow-[0_20px_45px_-28px_rgba(15,23,42,0.7)]"
                : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-white"
            )}
            type="button"
            onClick={() => onSelect(option)}
          >
            {option.popular ? (
              <span
                className={cn(
                  "absolute -top-2.5 left-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                  isSelected
                    ? "bg-white text-slate-950"
                    : "bg-slate-950 text-white"
                )}
              >
                Most popular
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-slate-200" : "text-slate-600"
                  )}
                >
                  {option.duration_label}
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <p className="text-3xl font-semibold tracking-tight">
                    {option.price}
                  </p>
                  <span
                    className={cn(
                      "pb-1 text-sm",
                      isSelected ? "text-slate-300" : "text-slate-500"
                    )}
                  >
                    {option.currency}
                  </span>
                </div>
                {option.original_price ? (
                  <p
                    className={cn(
                      "mt-2 text-sm line-through",
                      isSelected ? "text-slate-400" : "text-slate-400"
                    )}
                  >
                    {option.original_price} {option.currency}
                  </p>
                ) : null}
              </div>

              <div
                className={cn(
                  "mt-1 flex h-8 w-8 items-center justify-center rounded-full",
                  isSelected ? "bg-white text-slate-950" : "bg-white text-slate-500"
                )}
              >
                <Check className="h-4 w-4" />
              </div>
            </div>

            {discount > 0 ? (
              <p
                className={cn(
                  "mt-4 text-xs font-semibold uppercase tracking-[0.18em]",
                  isSelected ? "text-emerald-300" : "text-emerald-600"
                )}
              >
                Save {discount}%
              </p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
