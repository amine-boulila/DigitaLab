import Link from 'next/link';
import { Product } from '@/types';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startPrice = Math.min(...product.prices.map(p => p.price));
  const currency = product.prices[0].currency;

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20"
    >
      {product.badge && (
        <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
          {product.badge}
        </div>
      )}
      
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 relative">
         {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
         ) : (
             <div className="h-16 w-16 rounded-xl bg-white/10 p-4 text-white group-hover:scale-110 transition-transform duration-300">
                <Star className="h-full w-full text-indigo-400" />
             </div>
         )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-400">
          {product.short_description}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-lg font-bold text-white">
              {startPrice} <span className="text-sm font-normal text-gray-400">{currency}</span>
            </p>
          </div>
          
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-indigo-500">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
