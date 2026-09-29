import React, { useState } from 'react';
import { X, Star, Check, Trees, RefreshCw, Shield, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/helpers';
import { ProductIllustration } from './BotanicalArtwork';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, isRefill: boolean) => void;
  onOpenIngredientGlossary?: (ingredientKeyword?: string) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenIngredientGlossary
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isRefill, setIsRefill] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const currentPrice = isRefill ? Math.round(product.price * 0.5) : product.price;

  const handleAdd = () => {
    onAddToCart(product, quantity, isRefill);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E2DDD5] overflow-hidden my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Visual */}
          <div className="h-72 md:h-full min-h-[340px] relative bg-[#F5F0EA]">
            <ProductIllustration
              type={product.category}
              accent={product.accentColor}
              name={product.name}
              size={product.size}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#1C3325] text-white text-xs px-3 py-1 rounded-full font-medium">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-[#758A7A]">
                  {product.category}
                </span>
                <span className="font-mono">{product.size}</span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#1C3325] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1 font-sans">{product.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                  {formatINR(currentPrice)}
                </span>
                {!isRefill && product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {isRefill && (
                  <span className="text-xs font-medium bg-[#EBF0EC] text-[#2C4836] px-2 py-0.5 rounded-full">
                    50% Refill Discount Applied
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Key botanical actives */}
              <div className="mt-4 pt-3 border-t border-[#E8ECE9]">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Key Botanical Actives
                  </p>
                  {onOpenIngredientGlossary && (
                    <button
                      onClick={() => onOpenIngredientGlossary(product.keyIngredients[0])}
                      className="text-[11px] text-[#758A7A] hover:text-[#1C3325] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ayurvedic Origins ↗</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.keyIngredients.map((item, idx) => (
                    <span
                      key={idx}
                      onClick={() => onOpenIngredientGlossary && onOpenIngredientGlossary(item)}
                      className={`text-xs bg-[#F4EFEB] text-[#1C3325] px-2.5 py-1 rounded-md border border-[#E8ECE9] ${
                        onOpenIngredientGlossary ? 'cursor-pointer hover:border-[#758A7A] hover:bg-white transition-colors' : ''
                      }`}
                      title={onOpenIngredientGlossary ? 'Click to inspect in Ingredient Glossary' : undefined}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Refill toggle selection */}
              <div className="mt-4 p-3 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#1C3325] flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-[#758A7A]" />
                    <span>Select Refill Format</span>
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Bring your clean bottle or receive biodegradable refill pouch (Save 50%)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRefill(!isRefill)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isRefill
                      ? 'bg-[#1C3325] text-white'
                      : 'bg-white text-stone-700 border border-stone-300'
                  }`}
                >
                  {isRefill ? 'Refill Selected' : 'Standard Jar'}
                </button>
              </div>
            </div>

            {/* Actions: Quantity & Add to cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D2DCD4] rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-mono font-semibold text-[#1C3325]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-[#43634E] text-white'
                      : 'bg-[#1C3325] hover:bg-[#122118] text-[#FAF8F5]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag · {formatINR(currentPrice * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 font-sans">
                <span className="flex items-center gap-1">
                  <Trees className="w-3.5 h-3.5 text-[#758A7A]" />
                  <span>{quantity} Tree{quantity > 1 ? 's' : ''} Planted</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#758A7A]" />
                  <span>Plastic-Neutral Certified</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
