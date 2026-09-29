import React from 'react';
import { Heart, Sparkles, RefreshCw, Sprout, ShieldCheck, Award } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      icon: Heart,
      title: 'PETA-Certified Cruelty-Free',
      description: 'Zero testing on animals at any stage of development. We test only on willing human skin enthusiasts under strict clinical dermatological oversight.',
      stat: '0% Animal Byproducts'
    },
    {
      icon: Sprout,
      title: '100% Vegan & Biocompatible',
      description: 'Every drop is 100% plant-powered without beeswax, carmine, lanolin, or synthetic fillers. Formulated to match the human lipid mantle naturally.',
      stat: 'Clean Botanical Actives'
    },
    {
      icon: Sparkles,
      title: 'Regenerative Indian Sourcing',
      description: 'We source Kashmiri saffron directly from family growers in Pampore, rose water from Kannauj distillers, and cold-pressed amla from certified organic growers.',
      stat: 'Direct-to-Farmer Trade'
    },
    {
      icon: RefreshCw,
      title: 'Infinite Refill Glass Loop',
      description: 'Say goodbye to plastic throwaways. Return your clean amber glass bottles to our partner stores to receive 50% off refills, cutting landfill waste to zero.',
      stat: '50% In-Store Discount'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Greenwashing Policy',
      description: 'No vague marketing buzzwords. Every single ingredient percentage, extraction method, and certificate is open-source and listed on every bottle.',
      stat: '100% Label Transparency'
    },
    {
      icon: Award,
      title: 'Plastic-Neutral Certified',
      description: 'For every gram of packaging shipped, we fund the recovery and recycling of 2x equivalent post-consumer ocean-bound plastic in coastal Maharashtra & Goa.',
      stat: '200% Plastic Offset'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F4EFEB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold mb-2">
            The Botanical Standard
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C3325]">
            Why Blush &amp; Bloom Stands Apart
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-sans">
            Born out of frustration with plastic-heavy and "greenwashed" cosmetics in India.
            We uphold an uncompromising commitment to your skin and the Earth.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#E2DDD5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF0EC] text-[#2C4836] flex items-center justify-center mb-5 group-hover:bg-[#1C3325] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#1C3325] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8ECE9] flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#758A7A]">
                    {pillar.stat}
                  </span>
                  <span className="text-[11px] font-sans text-stone-400">Verified 2026</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
