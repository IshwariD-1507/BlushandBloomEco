import React, { useState, useMemo } from 'react';
import { Star, ShoppingBag, Eye, Search, Sparkles, Filter, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { formatINR } from '../utils/helpers';
import { ProductIllustration } from './BotanicalArtwork';

interface ShopProps {
  onAddToCart: (product: Product, quantity?: number, isRefill?: boolean) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenIngredientGlossary?: (keyword?: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ onAddToCart, onOpenQuickView, onOpenIngredientGlossary }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.keyIngredients.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, false);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1400);
  };

  return (
    <section id="shop" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold mb-2">
            The Sustainable Dispensary
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C3325] tracking-tight">
            Curated Botanical Formulations
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-sans">
            Every bottle is hand-poured in small batches, housed in infinite recyclable amber glass,
            and eligible for our 50% in-store refill program.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8ECE9]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-[#F4EFEB] rounded-xl border border-[#E8ECE9]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C3325] text-[#FAF8F5] shadow-xs'
                    : 'text-stone-600 hover:text-[#1C3325] hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saffron, amla, mist..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A] focus:ring-1 focus:ring-[#758A7A] text-[#1C3325] placeholder:text-stone-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#F5F0EA] rounded-2xl border border-dashed border-[#D2DCD4]">
            <p className="text-lg font-serif text-[#1C3325]">No botanical formulations match your query</p>
            <p className="text-xs text-stone-500 mt-1">Try searching for ingredients like "Rose", "Amla", or "Bakuchiol"</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#1C3325] text-white text-xs rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onOpenQuickView(product)}
                  className="group relative bg-[#FAF8F5] rounded-3xl border border-[#E8ECE9] hover:border-[#758A7A]/60 shadow-xs card-luxury flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Visual Header / Image Area */}
                  <div className="relative aspect-4/3 w-full bg-[#F4EFEB] overflow-hidden">
                    <ProductIllustration
                      type={product.category}
                      accent={product.accentColor}
                      name={product.name}
                      size={product.size}
                    />

                    {/* Badge top-left */}
                    {product.badge && (
                      <span className="absolute top-3.5 left-3.5 bg-[#1C3325] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick view button overlay */}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="p-2 rounded-full bg-white/95 text-stone-700 shadow-md flex items-center justify-center hover:bg-white hover:text-stone-950 transition-transform hover:scale-105">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Hover Quick Add to Cart button */}
                    <div className="absolute inset-x-3.5 bottom-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold shadow-lg flex items-center justify-center gap-1.5 transition-all luxury-button-glow ${
                          isAdded
                            ? 'bg-[#43634E] text-white shadow-emerald-900/30'
                            : 'bg-[#1C3325] text-[#FAF8F5] hover:bg-[#122118]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Quick Add · {formatINR(product.price)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Size */}
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                        <span className="uppercase tracking-wider font-semibold text-[#758A7A]">
                          {product.category}
                        </span>
                        <span className="font-mono text-[11px]">{product.size}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-base font-serif font-bold text-[#1C3325] group-hover:text-[#43634E] transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-stone-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Botanical key active chip */}
                      {onOpenIngredientGlossary && (
                        <div className="mt-2.5 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenIngredientGlossary(product.keyIngredients[0]);
                            }}
                            className="text-[10px] text-[#758A7A] hover:text-[#1C3325] bg-[#EBF0EC]/80 hover:bg-[#EBF0EC] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 transition-colors"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Active: {product.keyIngredients[0].split(' ')[0]}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Footer Row: Price, Rating & Refill marker */}
                    <div className="mt-4 pt-3 border-t border-[#F0EBE5] flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-serif font-bold text-[#1C3325] tabular-nums">
                            {formatINR(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-stone-400 line-through tabular-nums">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#758A7A] block font-mono">
                          Refill in-store: {formatINR(Math.round(product.price * 0.5))}
                        </span>
                      </div>

                      {/* Review star */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-stone-700 bg-[#F4EFEB] px-2 py-1 rounded-md">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
