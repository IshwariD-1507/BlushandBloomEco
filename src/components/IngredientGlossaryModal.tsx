import React, { useState } from 'react';
import { X, Search, Sparkles, MapPin, Leaf, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { INGREDIENT_GLOSSARY, Ingredient } from '../data/ingredientsData';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface IngredientGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIngredientId?: string | null;
  onSelectProduct?: (product: Product) => void;
}

export const IngredientGlossaryModal: React.FC<IngredientGlossaryModalProps> = ({
  isOpen,
  onClose,
  initialIngredientId,
  onSelectProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeIngredientId, setActiveIngredientId] = useState<string>(
    initialIngredientId || INGREDIENT_GLOSSARY[0].id
  );

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Botanicals' },
    { id: 'herb', label: 'Ayurvedic Herbs' },
    { id: 'bioactive', label: 'Clean Bio-Actives' },
    { id: 'flower', label: 'Floral Distillates' },
    { id: 'adaptogen', label: 'Dermal Adaptogens' }
  ];

  const filteredIngredients = INGREDIENT_GLOSSARY.filter((ing) => {
    const matchCat = selectedCategory === 'all' || ing.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.harvestRegion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeIngredient =
    INGREDIENT_GLOSSARY.find((i) => i.id === activeIngredientId) || filteredIngredients[0] || INGREDIENT_GLOSSARY[0];

  const matchingProducts = PRODUCTS.filter((p) =>
    activeIngredient.usedInProductIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E2DDD5] overflow-hidden my-6 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-[#1C3325] text-white flex items-center justify-between border-b border-[#2C4836]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-emerald-300">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-bold text-white">
                  Ayurvedic &amp; Botanical Ingredient Glossary
                </h2>
                <span className="text-[10px] bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded-md font-mono">
                  100% Transparent
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Explore the Ayurvedic lineage, bioactive compounds, and clinical skin/hair benefits of our Indian herbs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-[#F5F0EA] border-b border-[#E8ECE9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-[#1C3325] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-[#D2DCD4]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search Saffron, Bakuchiol, Amla..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-[#D2DCD4] text-xs text-[#1C3325] placeholder:text-stone-400 focus:outline-hidden focus:border-[#758A7A]"
            />
          </div>
        </div>

        {/* Main Content: Split Grid */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Ingredient List */}
          <div className="md:col-span-4 border-r border-[#E8ECE9] overflow-y-auto max-h-[55vh] md:max-h-none p-3 space-y-1.5 bg-[#FAF8F5]">
            {filteredIngredients.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveIngredientId(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  activeIngredient.id === item.id
                    ? 'bg-[#EBF0EC] border-[#1C3325] shadow-xs'
                    : 'bg-white border-[#E8ECE9] hover:border-[#758A7A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#1C3325] line-clamp-1">
                    {item.name}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.accentColor }}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-sans italic mt-0.5">
                  <span>{item.botanicalName}</span>
                </div>
                <p className="text-[10px] text-[#758A7A] font-mono mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.harvestRegion.split(',')[0]}</span>
                </p>
              </button>
            ))}
          </div>

          {/* Right Column: Active Ingredient Deep Dive */}
          <div className="md:col-span-8 p-6 overflow-y-auto max-h-[60vh] md:max-h-[550px] space-y-6 bg-white">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs uppercase font-mono tracking-widest text-[#758A7A] font-semibold">
                  Sanskrit: {activeIngredient.sanskritName}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF0EC] text-[#2C4836] font-medium">
                  {activeIngredient.doshaEffect}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#1C3325]">
                {activeIngredient.name}
              </h3>
              <p className="text-xs font-mono text-stone-500 italic mt-0.5">
                Botanical Taxon: {activeIngredient.botanicalName}
              </p>
              <p className="text-xs sm:text-sm text-stone-700 font-sans mt-3 leading-relaxed">
                {activeIngredient.summary}
              </p>
            </div>

            {/* Harvesting Region */}
            <div className="p-3.5 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5] flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#758A7A] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#1C3325]">Regenerative Sourcing Origin</p>
                <p className="text-xs text-stone-600 font-sans">{activeIngredient.harvestRegion}</p>
              </div>
            </div>

            {/* Ayurvedic Lineage */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">
                Classical Ayurvedic Lineage
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8ECE9]">
                {activeIngredient.ayurvedicOrigins}
              </p>
            </div>

            {/* Active Compounds & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8ECE9]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1C3325] mb-2">
                  Active Phytonutrients
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-600 font-mono">
                  {activeIngredient.activeCompounds.map((comp, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#758A7A]" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8ECE9]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1C3325] mb-2">
                  Clinical Dermal Benefits
                </h5>
                <ul className="space-y-2 text-xs text-stone-600 font-sans">
                  {activeIngredient.skinHairBenefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#43634E] font-bold text-xs shrink-0 mt-0.5">✓</span>
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Formulations containing this active */}
            {matchingProducts.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2.5">
                  Available in Blush &amp; Bloom Formulations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchingProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(p);
                          onClose();
                        }
                      }}
                      className="p-2.5 rounded-lg border border-[#E8ECE9] bg-[#FAF8F5] hover:border-[#1C3325] cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-serif font-bold text-[#1C3325] line-clamp-1">{p.name}</p>
                        <p className="text-[10px] text-stone-500 font-mono">{p.size} · ₹{p.price}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
