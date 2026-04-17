"use client";

import { MessageCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { DurationSelector } from "@/components/DurationSelector";
import { Surface } from "@/components/ui/surface";
import { openWhatsApp } from "@/lib/whatsapp";
import type { PriceOption, Product } from "@/types";

interface ProductPricingProps {
  product: Product;
}

export function ProductPricing({ product }: ProductPricingProps) {
  const [selectedOption, setSelectedOption] = useState<PriceOption>(
    product.prices.find((price) => price.popular) ?? product.prices[0]
  );

  const handleOrder = () => {
    openWhatsApp({
      currency: selectedOption.currency,
      duration: selectedOption.duration_label,
      price: selectedOption.price.toString(),
      productName: product.name,
    });
  };

  return (
    <Surface className="p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            Order summary
          </p>
          <h3 className="mt-3 font-display text-3xl text-slate-950">
            Choose a plan
          </h3>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Instant delivery
        </div>
      </div>

      <div className="mt-6">
        <DurationSelector
          options={product.prices}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
      </div>

      <div className="mt-8 rounded-[28px] bg-slate-950 p-6 text-white">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">Total price</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight">
              {selectedOption.price}
              <span className="ml-2 text-lg font-medium text-slate-300">
                {selectedOption.currency}
              </span>
            </p>
          </div>
          {selectedOption.original_price ? (
            <div className="text-right">
              <p className="text-sm text-slate-400 line-through">
                {selectedOption.original_price} {selectedOption.currency}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Save{" "}
                {Math.round(
                  ((selectedOption.original_price - selectedOption.price) /
                    selectedOption.original_price) *
                    100
                )}
                %
              </p>
            </div>
          ) : null}
        </div>

        <button
          className={buttonStyles({
            className: "mt-6 w-full justify-center",
            size: "lg",
            variant: "success",
          })}
          type="button"
          onClick={handleOrder}
        >
          <MessageCircle className="h-5 w-5" />
          Order via WhatsApp
        </button>

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          Fast confirmation and delivery once your payment is approved.
        </div>
      </div>
    </Surface>
  );
}
