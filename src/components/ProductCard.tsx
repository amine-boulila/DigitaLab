import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startPrice = Math.min(...product.prices.map((price) => price.price));
  const currency = product.prices[0]?.currency ?? "";

  return (
    <Link
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/80 bg-white/88 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_26px_70px_-34px_rgba(13,148,136,0.24)]"
      href={`/products/${product.slug}`}
    >
      {product.badge ? (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          {product.badge}
        </div>
      ) : null}

      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 via-white to-teal-50 p-5">
        {product.image_url ? (
          <img
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            src={product.image_url}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Star className="h-7 w-7 text-amber-500" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold text-slate-950 transition-colors group-hover:text-teal-700">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.short_description}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-slate-200 pt-4">
          <div>
            <p className="text-xs font-medium text-slate-400">Starting from</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">
              {startPrice}{" "}
              <span className="text-sm font-normal text-slate-500">{currency}</span>
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-950 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
