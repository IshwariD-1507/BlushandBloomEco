import React from 'react';

export const LeafBranchIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20,80 Q50,60 80,20" />
    <path d="M38,68 Q30,55 35,46 Q45,55 48,60" fill="currentColor" fillOpacity="0.15" />
    <path d="M52,57 Q62,48 70,52 Q62,63 56,61" fill="currentColor" fillOpacity="0.15" />
    <path d="M64,42 Q60,30 68,24 Q75,34 70,40" fill="currentColor" fillOpacity="0.15" />
    <path d="M78,22 Q88,25 90,16 Q79,15 78,22" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

export const RoseBloomIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="50" cy="50" r="14" fill="currentColor" fillOpacity="0.2" />
    <path d="M50 25 C62 25 72 35 72 50 C72 65 62 75 50 75 C38 75 28 65 28 50 C28 35 38 25 50 25 Z" />
    <path d="M50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 Z" />
    <path d="M50 85 Q50 95 48 98" />
    <path d="M49 90 Q38 88 35 94" />
    <path d="M50 92 Q62 90 64 96" />
  </svg>
);

export const TreeSproutIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M50 88 L50 48" />
    <path d="M50 62 Q35 55 30 42 Q45 42 50 56" fill="currentColor" fillOpacity="0.2" />
    <path d="M50 52 Q65 42 70 30 Q55 32 50 46" fill="currentColor" fillOpacity="0.2" />
    <path d="M50 48 Q35 30 48 18 Q62 25 50 46" fill="currentColor" fillOpacity="0.2" />
    <path d="M25 88 Q50 92 75 88" strokeWidth="2" />
  </svg>
);

export const ProductIllustration: React.FC<{
  type: string;
  accent: string;
  name: string;
  size?: string;
}> = ({ type, accent, name, size }) => {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 overflow-hidden select-none transition-transform duration-700 group-hover:scale-[1.03]">
      {/* Studio Backdrop & Natural Lighting Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 45% 30%, #FCFAF7 0%, #F5EFE8 55%, #EBE1D6 100%)`
        }}
      />

      {/* Atmospheric Soft Light Aura behind bottle */}
      <div
        className="absolute w-52 h-52 rounded-full blur-3xl opacity-35 transition-all duration-700 group-hover:opacity-60 group-hover:scale-125"
        style={{
          backgroundColor: accent,
          transform: 'translateY(-10px)'
        }}
      />

      {/* Travertine Stone Table Pedestal Line & Soft Ambient Shadows */}
      <div className="absolute bottom-3 left-0 right-0 h-16 bg-gradient-to-t from-[#E2D8CC]/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-5 w-32 h-4 rounded-full bg-[#3D2817]/25 blur-md transform scale-x-125 group-hover:scale-x-140 transition-transform duration-500" />
      <div className="absolute bottom-6 w-20 h-2 rounded-full bg-[#1F120A]/35 blur-[2px] transition-transform duration-500" />

      {/* Subtle Botanical Leaf Shadow silhouette in distance */}
      <div className="absolute -top-6 -right-6 text-[#2D4534]/8 pointer-events-none transform rotate-45 scale-125">
        <LeafBranchIcon className="w-48 h-48" />
      </div>

      {/* Photorealistic Cosmetic Glass Bottles & Jars Container */}
      <div className="relative z-10 flex flex-col items-center">
        {type === 'haircare' || name.includes('Oil') ? (
          /* ========================================================================= */
          /* 1. LUXURY DARK AMBER APOTHECARY HAIR ELIXIR PUMP BOTTLE */
          /* ========================================================================= */
          <div className="relative flex flex-col items-center drop-shadow-xl filter">
            {/* Metallic Brushed Brass Pump Actuator */}
            <div className="w-4 h-6 bg-gradient-to-r from-[#8E704F] via-[#DFBF8F] to-[#785A39] rounded-t-sm shadow-xs border-t border-[#E8CE9F]" />
            <div className="w-6 h-2 bg-gradient-to-r from-[#5A4228] via-[#B89668] to-[#48331E] rounded-xs shadow-inner" />
            
            {/* Pump Collar & Thread Ring */}
            <div className="w-9 h-3.5 bg-gradient-to-r from-[#A38258] via-[#F3DAAF] to-[#6E5331] rounded-xs border-y border-[#543E23] flex items-center justify-around px-1 shadow-xs">
              <span className="w-0.5 h-full bg-[#523A1E]/40" />
              <span className="w-0.5 h-full bg-[#523A1E]/40" />
              <span className="w-0.5 h-full bg-[#523A1E]/40" />
            </div>

            {/* Amber Glass Shoulder & Neck */}
            <div className="w-7 h-3 bg-gradient-to-r from-[#4E2B14] via-[#7B4621] to-[#3A1E0B] border-x border-[#301607]" />

            {/* Main Amber Glass Bottle Body */}
            <div className="w-22 h-34 rounded-t-2xl rounded-b-md bg-gradient-to-r from-[#3D200E] via-[#854B22] to-[#2E1608] p-2 flex flex-col items-center justify-between border border-[#522D13] relative overflow-hidden shadow-2xl">
              {/* Internal Glass Meniscus & Fluid Caustics */}
              <div className="absolute top-0 bottom-0 left-2 w-2.5 bg-gradient-to-r from-transparent via-[#E89E5A]/30 to-transparent blur-[1px]" />
              <div className="absolute top-1 left-3.5 w-1 h-30 bg-white/40 rounded-full blur-[0.6px]" />
              <div className="absolute top-0 bottom-0 right-1.5 w-1.5 bg-[#FFBF69]/20 blur-[1px]" />

              {/* Textured Linen Paper Label */}
              <div className="w-full bg-[#FAF8F5] py-2 px-1 rounded-sm text-center shadow-md border border-[#E4DCBF] my-auto relative z-10">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49774_1px,transparent_1px)] [background-size:4px_4px]" />
                <p className="text-[6.5px] uppercase tracking-widest text-[#758A7A] font-bold">Blush &amp; Bloom</p>
                <div className="w-6 h-[1px] bg-[#C49774] mx-auto my-0.5" />
                <p className="text-[8.5px] font-serif font-bold text-[#1C3325] leading-tight line-clamp-2 px-0.5">
                  {name.split(' ')[0]} {name.split(' ')[1]}
                </p>
                <p className="text-[6.5px] text-stone-500 font-mono mt-0.5 tracking-tight">{size || '100 ml'}</p>
                <div className="mt-0.5 text-[5.5px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">100% Ayurvedic</div>
              </div>

              {/* Bottom heavy glass base */}
              <div className="w-full h-2 bg-gradient-to-r from-[#2B160A] via-[#5C3214] to-[#241006] rounded-b-xs border-t border-[#6F3C18]/40" />
            </div>
          </div>
        ) : type === 'bundles' ? (
          /* ========================================================================= */
          /* 2. REUSABLE ARTISANAL HAND-WOVEN CANE & LINEN GIFT HAMPER */
          /* ========================================================================= */
          <div className="relative flex flex-col items-center drop-shadow-xl filter">
            {/* Botanical Wax Seal Ribbon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9C382C] to-[#E35D4B] border-2 border-[#FAF8F5] flex items-center justify-center -mb-3.5 z-20 shadow-md">
              <span className="text-white text-xs font-serif font-bold">🌿</span>
            </div>

            {/* Woven Cane Hamper Body */}
            <div className="w-30 h-30 rounded-2xl bg-gradient-to-tr from-[#CFB89F] via-[#EADBCA] to-[#F5ECE1] p-3 flex flex-col items-center justify-center border-2 border-[#B89C80] relative shadow-2xl overflow-hidden">
              {/* Cane weave texture pattern */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#7D5C3A_1px,transparent_1px)] [background-size:6px_6px]" />
              <div className="w-full h-full border border-dashed border-[#8A6746] rounded-xl p-2 flex flex-col items-center justify-center text-center relative z-10 bg-[#FAF8F5]/80 backdrop-blur-2xs">
                <span className="text-[7px] uppercase tracking-widest text-[#758A7A] font-bold">Festive Edition</span>
                <p className="text-[10.5px] font-serif font-bold text-[#1C3325] leading-snug mt-1">
                  {name.includes('Starter') ? 'Radiance Ritual' : 'Forest Hamper'}
                </p>
                <div className="w-8 h-[1px] bg-[#C49774] my-1" />
                <span className="text-[6.5px] text-[#7A6451] font-mono">Artisan Cane &amp; Amber Glass</span>
              </div>
            </div>
          </div>
        ) : name.includes('Nectar') || name.includes('Crème') || name.includes('Polish') || name.includes('Butter') ? (
          /* ========================================================================= */
          /* 3. HEAVY FROSTED / TRAVERTINE GLASS JAR WITH TURNED BEECHWOOD LID */
          /* ========================================================================= */
          <div className="relative flex flex-col items-center drop-shadow-xl filter">
            {/* Natural Turned Beechwood / Brushed Gold Lid */}
            <div className="w-26 h-5 bg-gradient-to-r from-[#A88258] via-[#D8B98C] to-[#966E44] rounded-t-lg border-b border-[#6E4F2C] shadow-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.3)_50%,transparent_100%)]" />
              <div className="w-24 h-[1px] bg-white/40 absolute top-0.5 rounded-full" />
            </div>

            {/* Heavy Base Cosmetic Glass Jar */}
            <div className="w-28 h-22 rounded-b-2xl bg-gradient-to-b from-[#FAF7F2] via-[#EFE7DC] to-[#DECFC0] p-2 flex flex-col items-center justify-center border border-[#D5C6B5] relative overflow-hidden shadow-2xl">
              {/* Glass specular shine highlight */}
              <div className="absolute top-1 left-3.5 w-1.5 h-16 bg-white/70 rounded-full blur-[0.6px]" />
              <div className="absolute top-0 bottom-0 right-2 w-1.5 bg-white/40 blur-[0.8px]" />

              {/* Botanical Emulsion color glimpse */}
              <div
                className="w-22 h-14 rounded-md p-1.5 flex flex-col items-center justify-center text-center shadow-xs border border-[#DFD3C3] relative z-10"
                style={{ backgroundColor: '#FAF8F5' }}
              >
                <p className="text-[6px] uppercase tracking-widest text-[#758A7A] font-bold">Blush &amp; Bloom</p>
                <p className="text-[8.5px] font-serif font-bold text-[#1C3325] leading-tight line-clamp-1 mt-0.5">
                  {name.split(' ')[0]} {name.split(' ')[1]}
                </p>
                <p className="text-[6.5px] text-stone-500 font-mono mt-0.5">{size || '50 g'}</p>
              </div>

              {/* Heavy base thickness */}
              <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-t from-[#BFAEA0]/60 to-transparent" />
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 4. LUXURY AMBER DROPPER ELIXIR & HYDROSOL MIST VIAL */
          /* ========================================================================= */
          <div className="relative flex flex-col items-center drop-shadow-xl filter">
            {/* Natural Matte Cream Rubber Dropper Bulb */}
            <div className="w-4 h-6 bg-gradient-to-r from-[#D5C2B6] via-[#FAF4EF] to-[#BFABA0] rounded-t-full border border-[#B39E92] shadow-inner" />
            {/* Shiny Gold / Brushed Brass Ring Collar */}
            <div className="w-7 h-3 bg-gradient-to-r from-[#9C794D] via-[#F5D8A3] to-[#806138] rounded-xs shadow-xs border-y border-[#5E4423]" />

            {/* Cylindrical Amber Apothecary Dropper Body */}
            <div className="w-20 h-32 rounded-t-xl rounded-b-md bg-gradient-to-r from-[#42220E] via-[#8A4A20] to-[#301607] p-2 flex flex-col items-center justify-between border border-[#593014] relative overflow-hidden shadow-2xl">
              {/* Internal Glass Dropper Pipette Reflection */}
              <div className="absolute top-1 left-2.5 w-1 h-28 bg-white/45 rounded-full blur-[0.6px]" />
              <div className="absolute top-0 bottom-0 left-1 w-2 bg-gradient-to-r from-transparent via-[#FF9E4A]/25 to-transparent blur-[1px]" />
              <div className="absolute top-0 bottom-0 right-1.5 w-1 bg-amber-400/20 blur-[1px]" />

              {/* Label */}
              <div className="w-full bg-[#FAF8F5] py-2 px-1 rounded-sm text-center shadow-md border border-[#E2D8BF] my-auto relative z-10">
                <p className="text-[6px] uppercase tracking-widest text-[#758A7A] font-bold">Blush &amp; Bloom</p>
                <div className="w-4 h-[1px] bg-[#C49774] mx-auto my-0.5" />
                <p className="text-[8.5px] font-serif font-bold text-[#1C3325] leading-tight line-clamp-2 px-0.5">
                  {name.split(' ')[0]} {name.split(' ')[1]}
                </p>
                <p className="text-[6.5px] text-stone-500 font-mono mt-0.5">{size || '30 ml'}</p>
              </div>

              {/* Amber glass bottom contour */}
              <div className="w-full h-1.5 bg-gradient-to-r from-[#241005] via-[#522910] to-[#1E0C04] rounded-b-xs" />
            </div>
          </div>
        )}
      </div>

      {/* Sustainable Refill Marker Badge */}
      <div className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-[#43634E] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-[#D2DCD4] shadow-xs flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#758A7A]" />
        <span>50% In-Store Refill</span>
      </div>
    </div>
  );
};
