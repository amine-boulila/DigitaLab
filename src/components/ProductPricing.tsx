"use client";

import { useState } from "react";
import { Product, PriceOption } from "@/types";
import { DurationSelector } from "@/components/DurationSelector";
import { openWhatsApp } from "@/lib/whatsapp";
import { MessageCircle, ShieldCheck } from "lucide-react";

interface ProductPricingProps {
  product: Product;
}

export function ProductPricing({ product }: ProductPricingProps) {
  const [selectedOption, setSelectedOption] = useState<PriceOption>(
    product.prices.find((p) => p.popular) || product.prices[0]
  );

  const handleOrder = () => {
    openWhatsApp({
      productName: product.name,
      duration: selectedOption.duration_label,
      price: selectedOption.price.toString(),
      currency: selectedOption.currency,
    });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:p-8">
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold text-white">Select Duration</h3>
        <DurationSelector 
          options={product.prices} 
          selectedOption={selectedOption} 
          onSelect={setSelectedOption}
        />
      </div>

      <div className="mb-8 flex items-end justify-between border-t border-white/10 pt-8">
        <div>
          <p className="text-sm text-gray-400">Total Price</p>
          <p className="text-4xl font-bold text-white">
            {selectedOption.price} <span className="text-xl font-medium text-gray-400">{selectedOption.currency}</span>
          </p>
        </div>
        {selectedOption.original_price && (
           <div className="text-right">
             <p className="text-sm text-gray-500 line-through">{selectedOption.original_price} {selectedOption.currency}</p>
             <p className="text-xs font-bold text-green-400">Save {Math.round(((selectedOption.original_price - selectedOption.price) / selectedOption.original_price) * 100)}%</p>
           </div>
        )}
      </div>

      <button
        onClick={handleOrder}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        <MessageCircle className="h-6 w-6 fill-white text-white" />
        <span>Order via WhatsApp</span>
      </button>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4 text-green-500" />
        <span>Secure transaction · Instant delivery</span>
      </div>
    </div>
  );
}
