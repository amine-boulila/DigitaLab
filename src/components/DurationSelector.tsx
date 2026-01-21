"use client";

import { PriceOption } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface DurationSelectorProps {
  options: PriceOption[];
  selectedOption: PriceOption;
  onSelect: (option: PriceOption) => void;
}

export function DurationSelector({ options, selectedOption, onSelect }: DurationSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => {
        const isSelected = selectedOption.duration_value === option.duration_value;
        const discount = option.original_price 
          ? Math.round(((option.original_price - option.price) / option.original_price) * 100) 
          : 0;

        return (
          <button
            key={option.duration_value}
            onClick={() => onSelect(option)}
            className={cn(
              "relative flex flex-col rounded-xl border p-4 transition-all focus:outline-none",
              isSelected 
                ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500" 
                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
            )}
          >
            {option.popular && (
              <span className="absolute -top-3 left-4 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] uppercase font-bold text-white shadow-sm">
                Most Popular
              </span>
            )}
            
            <div className="flex w-full items-center justify-between">
              <span className={cn("text-sm font-medium", isSelected ? "text-indigo-400" : "text-gray-300")}>
                {option.duration_label}
              </span>
              {isSelected && <Check className="h-4 w-4 text-indigo-500" />}
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {option.price}<span className="text-sm font-normal text-gray-400 ml-1">{option.currency}</span>
              </span>
              {option.original_price && (
                <span className="text-sm text-gray-500 line-through">
                  {option.original_price}
                </span>
              )}
            </div>

            {discount > 0 && (
              <div className="mt-2 text-xs text-green-400">
                Save {discount}%
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
