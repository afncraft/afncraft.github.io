import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check, Hand } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { getPrimaryImage, formatINR } from '@/lib/products';
import { useCart } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  index?: number;
  showButtons?: boolean;
}

export default function ProductCard({ product, index = 0, showButtons = false }: ProductCardProps) {
  const imageUrl = getPrimaryImage(product);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;
    addToCart(product, imageUrl, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group flex flex-col animate-fade-in-up bg-ivory-50 rounded-xl overflow-hidden border border-ivory-200"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative img-zoom bg-ivory-100 aspect-square overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-ivory-200" />
          )}
          {!product.available && (
            <div className="absolute inset-0 bg-charcoal-800/40 flex items-center justify-center">
              <span className="bg-ivory-50 text-charcoal-800 px-4 py-1.5 text-xs font-medium uppercase tracking-widest rounded-full">
                Sold Out
              </span>
            </div>
          )}
          {product.featured && product.available && (
            <span className="absolute top-3 left-3 bg-gold-400 text-charcoal-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Featured
            </span>
          )}
          {product.handmade && (
            <span className="absolute top-3 right-3 bg-ivory-50/90 text-forest-700 px-2.5 py-1 text-[10px] font-sans uppercase tracking-widest rounded-full flex items-center gap-1">
              <Hand size={10} strokeWidth={2} />
              Handmade
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {product.category && (
          <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-gold-600 mb-1.5">
            {product.category.name}
          </p>
        )}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal-800 group-hover:text-forest-700 transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
        </Link>

        {showButtons && product.short_description && (
          <p className="text-charcoal-500 text-xs sm:text-sm font-light leading-relaxed mt-2 line-clamp-2">
            {product.short_description}
          </p>
        )}

        <p className="text-charcoal-800 font-sans text-base sm:text-lg font-semibold mt-3">
          {formatINR(product.price)}
        </p>

        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Link
              to={`/product/${product.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-2.5 border border-forest-700 text-forest-700 text-xs font-sans uppercase tracking-wide rounded-lg hover:bg-forest-700 hover:text-ivory-50 transition-colors duration-300"
            >
              View Product
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!product.available}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-2.5 bg-forest-700 text-ivory-50 text-xs font-sans uppercase tracking-wide rounded-lg hover:bg-forest-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {added ? (
                <>
                  <Check size={14} strokeWidth={2} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
