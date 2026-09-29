import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Trees } from 'lucide-react';
import { LeafBranchIcon, RoseBloomIcon } from './BotanicalArtwork';

interface HeroProps {
  treesCount: number;
}

export const Hero: React.FC<HeroProps> = ({ treesCount }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEB] to-[#FAF8F5]">
      {/* Subtle organic background ambient circles */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#EBF0EC] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#FBF4F2] rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Floating Botanical accents */}
      <div className="absolute top-20 left-8 md:left-24 text-[#758A7A]/25 pointer-events-none animate-float">
        <LeafBranchIcon className="w-24 h-24 md:w-36 md:h-36 -rotate-12" />
      </div>
      <div className="absolute bottom-24 right-8 md:right-28 text-[#D4A59D]/30 pointer-events-none animate-float" style={{ animationDelay: '2s' }}>
        <RoseBloomIcon className="w-20 h-20 md:w-32 md:h-32 rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top editorial kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D2DCD4] shadow-xs text-xs font-medium text-[#2C4836] backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#758A7A] animate-pulse" />
              <span>India’s First Zero-Plastic Circular Beauty House</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-bold text-[#1C3325] leading-[1.08] tracking-tight text-balance">
              Pure Indian Botanicals. <br />
              <span className="italic font-normal text-[#43634E]">Zero Plastic.</span> <br />
              100% Conscious Glow.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Dermatologist-tested skincare and Ayurvedic scalp elixirs crafted with wild-harvested Kashmiri saffron, fresh cold-distilled rose, and 100% refillable amber glassware.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#shop"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1C3325] hover:bg-[#122118] text-[#FAF8F5] text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#skincare-quiz"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#1C3325] text-sm font-medium rounded-xl transition-all border border-[#D2DCD4] shadow-xs hover:border-[#758A7A] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#758A7A]" />
                <span>Take Free Routine Quiz</span>
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-8 border-t border-[#E8ECE9] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#1C3325] tabular-nums">50% Off</p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Infinite Refills in Stores</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                  {treesCount.toLocaleString('en-IN')}+
                </p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Native Trees Planted</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-[#1C3325]">100% Vegan</p>
                <p className="text-xs text-stone-500 font-sans mt-0.5">PETA Certified Cruelty-Free</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame border */}
              <div className="absolute -inset-3 rounded-3xl border border-[#D2DCD4]/70 -rotate-1 pointer-events-none" />
              <div className="absolute -inset-3 rounded-3xl border border-[#E8C4BE]/50 rotate-1 pointer-events-none" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-[#F5F0EA] p-8 shadow-xl border border-[#E2DDD5] overflow-hidden flex flex-col items-center">
                {/* Top Badge */}
                <div className="w-full flex items-center justify-between text-xs text-stone-500 pb-4 border-b border-[#E8ECE9]">
                  <span className="font-serif italic text-sm text-[#1C3325]">Seasonal Harvest No. 04</span>
                  <span className="font-mono text-[#758A7A]">Batch 2026</span>
                </div>

                {/* Center Botanical Showcase with stylized bottles */}
                <div className="my-8 flex items-center justify-center gap-4 relative">
                  {/* Left bottle: Hair Oil */}
                  <div className="w-20 h-44 rounded-t-xl rounded-b-md bg-gradient-to-b from-[#59341B] to-[#2B180C] p-2 flex flex-col items-center justify-center shadow-lg transform -rotate-3 border border-[#3E2110]">
                    <div className="w-4 h-2 bg-[#D4A59D] rounded-xs mb-1" />
                    <div className="w-full bg-[#FAF8F5] py-2 px-1 text-[7px] text-center font-serif text-[#1C3325] rounded-xs">
                      Amla &amp; Bhringraj
                    </div>
                  </div>

                  {/* Center Star: Kumkumadi & Bakuchiol */}
                  <div className="w-24 h-52 rounded-t-2xl rounded-b-lg bg-gradient-to-b from-[#6C4222] via-[#4D2D14] to-[#291609] p-3 flex flex-col items-center justify-between shadow-2xl z-10 border border-[#482813] relative">
                    <div className="w-4 h-6 bg-[#FAF8F5] rounded-t-full border border-stone-300" />
                    <div className="w-full bg-[#FAF8F5] py-3 px-1 text-center shadow-xs rounded-sm border border-[#E2DDD5]">
                      <p className="text-[7px] uppercase tracking-widest text-[#758A7A] font-bold">Blush &amp; Bloom</p>
                      <p className="text-[9px] font-serif font-bold text-[#1C3325] mt-0.5">Kumkumadi &amp; Bakuchiol</p>
                      <p className="text-[7px] text-stone-500 font-mono mt-0.5">₹1,450 · 30ml</p>
                    </div>
                    <div className="text-[7px] text-amber-200 font-mono">100% Active</div>
                  </div>

                  {/* Right Jar: Rose Nectar */}
                  <div className="w-22 h-36 rounded-b-xl bg-gradient-to-b from-[#FAF6F2] to-[#EAE0D5] p-2 flex flex-col items-center justify-center shadow-lg transform rotate-4 border border-[#DACDC0]">
                    <div className="w-20 h-3 bg-[#C29D75] rounded-t-md mb-2" />
                    <div className="w-full bg-[#FAF8F5] py-1.5 px-1 text-[7px] text-center font-serif text-[#1C3325] rounded-xs">
                      Wild Rose Nectar
                    </div>
                  </div>
                </div>

                {/* Bottom Highlight pill */}
                <div className="w-full bg-[#EBF0EC] rounded-xl p-3 flex items-center justify-between text-xs text-[#1C3325]">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-[#758A7A]" />
                    <span className="font-medium">1 Tree Planted With This Order</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#2C4836] font-semibold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
