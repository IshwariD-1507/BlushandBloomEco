import React from 'react';
import { Instagram, Trees, Heart, ArrowUp } from 'lucide-react';
import { LeafBranchIcon } from './BotanicalArtwork';

export const Footer: React.FC<{ onOpenAnalytics: () => void; onOpenGlossary?: () => void }> = ({
  onOpenAnalytics,
  onOpenGlossary
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C3325] text-[#FAF8F5] pt-16 pb-10 border-t border-[#122118] relative overflow-hidden">
      {/* Background foliage watermark */}
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none text-white">
        <LeafBranchIcon className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Blush &amp; Bloom
            </span>
            <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-sm leading-relaxed">
              India’s first circular zero-plastic beauty and wellness collective. Handcrafted with certified organic
              Ayurvedic herbs, 100% refillable amber glass, and one native tree planted per creation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Blush & Bloom Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors font-serif font-bold text-sm"
                aria-label="Blush & Bloom Pinterest"
              >
                P
              </a>
              <button
                onClick={onOpenAnalytics}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-emerald-300 transition-colors ml-2"
              >
                Live Analytics ↗
              </button>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-4">
              Dispensary
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-sans">
              <li><a href="#shop" className="hover:text-white transition-colors">Skincare Elixirs</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Hair Density Oils</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Raw Cacao Body Care</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Festive Gift Boxes</a></li>
              <li><a href="#refill-program" className="hover:text-white transition-colors">50% In-Store Refills</a></li>
            </ul>
          </div>

          {/* Diagnostics & Impact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-4">
              Diagnostics &amp; Science
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-sans">
              <li><a href="#skincare-quiz" className="hover:text-white transition-colors">Skin Routine Quiz</a></li>
              <li><a href="#haircare-quiz" className="hover:text-white transition-colors">Scalp Revival Quiz</a></li>
              {onOpenGlossary && (
                <li>
                  <button
                    onClick={onOpenGlossary}
                    className="hover:text-white text-emerald-200 transition-colors cursor-pointer text-left"
                  >
                    Botanical Ingredient Glossary ↗
                  </button>
                </li>
              )}
              <li><a href="#our-impact" className="hover:text-white transition-colors">Reforestation Impact</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Zero-Greenwashing Lab</a></li>
              <li><a href="#our-story" className="hover:text-white transition-colors">Our Founders Story</a></li>
            </ul>
          </div>

          {/* Partner Cities */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-4">
              Sanctuaries
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-sans">
              <li><span>Mumbai (Bandra &amp; Kala Ghoda)</span></li>
              <li><span>Bengaluru (Indiranagar)</span></li>
              <li><span>Pune (Koregaon Park)</span></li>
              <li><span>Delhi NCR (Khan Market)</span></li>
              <li><span>Hyderabad &amp; Jaipur</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 Blush &amp; Bloom Eco. All Rights Reserved. Crafted with care in India.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-stone-400">UIT Marketing Research Initiative</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
