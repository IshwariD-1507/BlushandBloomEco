import React from 'react';
import { LeafBranchIcon, RoseBloomIcon } from './BotanicalArtwork';
import { Sparkles, Check, Heart, Shield, Trees } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-20 bg-[#F4EFEB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Story Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-[#FAF8F5] p-8 border border-[#E2DDD5] shadow-xl overflow-hidden">
              {/* Botanical watermark */}
              <div className="absolute -top-12 -right-12 text-[#758A7A]/15 pointer-events-none">
                <RoseBloomIcon className="w-56 h-56" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold">
                Founded in India · 2026
              </span>
              <h3 className="text-3xl font-serif font-bold text-[#1C3325] mt-2 mb-4 leading-tight">
                Rooted in Integrity, <br />
                Crafted for Radiance.
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                <p>
                  Blush &amp; Bloom was conceived when our founding team—passionate students and clean beauty researchers—walked
                  through traditional Indian beauty aisles and found hundreds of identical plastic pumps with deceptive
                  "natural" claims and undisclosed synthetic fillers.
                </p>
                <p>
                  We asked a simple question: <em className="text-[#1C3325] font-serif font-semibold">"Why should caring for your skin mean hurting our land?"</em>
                </p>
                <p>
                  We set out to formulate something radically transparent: cold-distilled Indian botanicals, proven biocompatible
                  actives like Bakuchiol and Snow Mushroom, housed solely in endlessly recyclable amber glass with a built-in circular
                  50% refill incentive.
                </p>
              </div>

              {/* Student Founders Badge & Academic Credit */}
              <div className="mt-6 pt-5 border-t border-[#E8ECE9]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                  Founding Team &amp; Research Initiative
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-700">
                  <div className="bg-white p-2 rounded-lg border border-[#E8ECE9]">
                    <span className="font-semibold block text-[#1C3325]">Swara Mulik</span>
                    <span className="text-[10px] text-stone-400">UIT2025965</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#E8ECE9]">
                    <span className="font-semibold block text-[#1C3325]">Nishigandha Joshi</span>
                    <span className="text-[10px] text-stone-400">UIT2025942</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#E8ECE9]">
                    <span className="font-semibold block text-[#1C3325]">Samrudhi Harde</span>
                    <span className="text-[10px] text-stone-400">UIT2025921</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#E8ECE9]">
                    <span className="font-semibold block text-[#1C3325]">Ishwari Deshmukh</span>
                    <span className="text-[10px] text-stone-400">UIT2025922</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D2DCD4] text-xs font-semibold text-[#2C4836] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#758A7A]" />
              <span>Our Ecological Manifesto</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C3325] leading-tight">
              Beauty That Feeds The Soil, <br />
              Never The Landfill.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base font-sans leading-relaxed">
              We reject the industry's disposable culture. In our formulation lab, every recipe is prepared
              in micro-batches to guarantee peak antioxidant bioavailability without artificial chemical stabilizers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                <h4 className="font-serif font-bold text-[#1C3325] text-base mb-1">
                  Wild-Crafted Potency
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  We partner directly with organic co-operatives in Kashmir, Himachal Pradesh, and Kerala to harvest plants at their astrological peak.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                <h4 className="font-serif font-bold text-[#1C3325] text-base mb-1">
                  100% Circular Amber Glass
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Our ultraviolet amber glass shields delicate botanical bio-actives from light degradation while being 100% recyclable forever.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                <h4 className="font-serif font-bold text-[#1C3325] text-base mb-1">
                  Direct Livelihood Impact
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Every order plants a native tree and generates verifiable living wages for female agricultural workers across Maharashtra and Karnataka.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                <h4 className="font-serif font-bold text-[#1C3325] text-base mb-1">
                  No Greenwashing Ever
                </h4>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Zero hidden sulphates, zero phthalates, zero synthetic perfumes. Just pure active nature tested with modern scientific precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
