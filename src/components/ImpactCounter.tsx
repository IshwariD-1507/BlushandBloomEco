import React, { useState } from 'react';
import { Trees, CloudRain, Wind, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import { TreeSproutIcon } from './BotanicalArtwork';

interface ImpactCounterProps {
  treesCount: number;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({ treesCount }) => {
  const [interactiveBottles, setInteractiveBottles] = useState(3);

  // Ecological math
  const calculatedTrees = interactiveBottles;
  const calculatedCO2 = interactiveBottles * 22; // ~22 kg CO2 absorbed per tree annually
  const calculatedWater = interactiveBottles * 85; // liters saved by plastic avoidance
  const calculatedFarmerHours = interactiveBottles * 2.5;

  return (
    <section id="our-impact" className="py-20 bg-[#1C3325] text-[#FAF8F5] relative overflow-hidden">
      {/* Background botanical aura */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2C4836] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#162A1F] rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Live Counter & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-xs border border-white/15">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>SankalpTaru Reforestation Partnership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              One Order. <br />
              One Native Tree Planted.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
              We believe true beauty leaves the world greener than it was found. Through our official alliance
              with grassroots restoration foundations in India, every single creation you purchase directly funds
              the planting and nurturing of indigenous trees across the Western Ghats biodiversity hotspot and Rajasthan’s arid belts.
            </p>

            {/* Big Live Counter Display */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                    Live Verified Tree Counter
                  </p>
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mt-1 tabular-nums">
                    {treesCount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <TreeSproutIcon className="w-10 h-10" />
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-3 font-sans flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Synchronized in real-time with customer orders &amp; stored locally.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Impact Simulator */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F5] text-[#1C3325] p-7 sm:p-9 rounded-3xl shadow-2xl border border-[#E2DDD5]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8ECE9]">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1C3325]">
                    Your Personal Impact Calculator
                  </h3>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">
                    Slide to see your footprint when switching to Blush &amp; Bloom
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-[#EBF0EC] text-[#2C4836] px-2.5 py-1 rounded-md">
                  Active Simulation
                </span>
              </div>

              {/* Slider */}
              <div className="my-6">
                <div className="flex justify-between items-center text-xs text-stone-600 mb-2 font-medium">
                  <span>Number of Botanical Bottles Selected:</span>
                  <span className="font-mono text-base font-bold text-[#1C3325]">
                    {interactiveBottles} bottle{interactiveBottles > 1 ? 's' : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={interactiveBottles}
                  onChange={(e) => setInteractiveBottles(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#D2DCD4] rounded-lg appearance-none cursor-pointer accent-[#1C3325]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                  <span>1 Bottle</span>
                  <span>6 Bottles</span>
                  <span>12 Bottles (Annual Routine)</span>
                </div>
              </div>

              {/* Impact Breakdown Cards */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5]">
                  <div className="flex items-center gap-1.5 text-xs text-[#758A7A] font-semibold mb-1">
                    <Trees className="w-3.5 h-3.5" />
                    <span>Native Trees</span>
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    +{calculatedTrees}
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    Planted in Western Ghats
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5]">
                  <div className="flex items-center gap-1.5 text-xs text-[#758A7A] font-semibold mb-1">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Carbon Offset</span>
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {calculatedCO2} kg
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    CO2 absorbed per year
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5]">
                  <div className="flex items-center gap-1.5 text-xs text-[#758A7A] font-semibold mb-1">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>Water Preserved</span>
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {calculatedWater} L
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    Virgin plastic water avoided
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5]">
                  <div className="flex items-center gap-1.5 text-xs text-[#758A7A] font-semibold mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Farmer Support</span>
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {calculatedFarmerHours.toFixed(1)} hrs
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    Fair-wage rural agro-forestry
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8ECE9] text-center">
                <a
                  href="#shop"
                  className="text-xs font-semibold text-[#1C3325] hover:text-[#758A7A] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Build your sustainable routine in our shop</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
