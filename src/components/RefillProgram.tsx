import React, { useState, useMemo } from 'react';
import { MapPin, Phone, Clock, RefreshCw, CheckCircle2, Search, ExternalLink, Navigation } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/storesData';
import { StoreLocation } from '../types';

export const RefillProgram: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['All', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Jaipur'];

  // Real-time store status calculator
  const getStoreStatus = (store: StoreLocation) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday...
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentDecimalHour = hours + minutes / 60;

    if (store.daysClosed && store.daysClosed.includes(day)) {
      return {
        isOpen: false,
        label: 'Closed Today',
        detail: 'Opens tomorrow',
        badgeColor: 'text-amber-700 bg-amber-50 border-amber-200'
      };
    }

    if (currentDecimalHour >= store.openHour && currentDecimalHour < store.closeHour) {
      const closeHourFormatted =
        store.closeHour >= 12
          ? `${Math.floor(store.closeHour === 12 ? 12 : store.closeHour - 12)}:${
              store.closeHour % 1 === 0.5 ? '30' : '00'
            } PM`
          : `${Math.floor(store.closeHour)}:${store.closeHour % 1 === 0.5 ? '30' : '00'} AM`;

      return {
        isOpen: true,
        label: 'Open Now',
        detail: `Until ${closeHourFormatted}`,
        badgeColor: 'text-emerald-800 bg-emerald-50 border-emerald-200'
      };
    } else {
      const openHourFormatted =
        store.openHour >= 12
          ? `${Math.floor(store.openHour === 12 ? 12 : store.openHour - 12)}:${
              store.openHour % 1 === 0.5 ? '30' : '00'
            } PM`
          : `${Math.floor(store.openHour)}:${store.openHour % 1 === 0.5 ? '30' : '00'} AM`;

      return {
        isOpen: false,
        label: 'Closed Now',
        detail: `Opens at ${openHourFormatted}`,
        badgeColor: 'text-stone-600 bg-stone-100 border-stone-200'
      };
    }
  };

  const filteredStores = useMemo(() => {
    return STORE_LOCATIONS.filter((store) => {
      const matchCity = selectedCity === 'All' || store.city === selectedCity;
      const matchQuery =
        searchQuery === '' ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.pincode.includes(searchQuery);
      return matchCity && matchQuery;
    });
  }, [selectedCity, searchQuery]);

  return (
    <section id="refill-program" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold mb-2">
            The Circular Loop
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C3325]">
            Save 50% with Every In-Store Refill
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-sans">
            Never pay for bottle manufacturing twice. Simply bring your clean, rinsed Blush &amp; Bloom
            amber bottle or jar to any of our partner apothecaries across India to enjoy our high-potency
            fresh batches at half the price.
          </p>
        </div>

        {/* 3 Step Circular Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#F4EFEB] p-6 rounded-2xl border border-[#E2DDD5] text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#1C3325] text-white flex items-center justify-center mx-auto mb-4 font-serif font-bold text-base">
              1
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C3325] mb-2">
              Finish Your Formulation
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Use every drop of your serum, oil, or cream. Rinse the heavy amber glass with warm water and let it air dry.
            </p>
          </div>

          <div className="bg-[#F4EFEB] p-6 rounded-2xl border border-[#E2DDD5] text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#758A7A] text-white flex items-center justify-center mx-auto mb-4 font-serif font-bold text-base">
              2
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C3325] mb-2">
              Visit a Partner Station
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Locate your nearest sanctuary in Mumbai, Bengaluru, Pune, Delhi NCR, Hyderabad, or Jaipur. Hand over your container.
            </p>
          </div>

          <div className="bg-[#F4EFEB] p-6 rounded-2xl border border-[#E2DDD5] text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#C49774] text-white flex items-center justify-center mx-auto mb-4 font-serif font-bold text-base">
              3
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C3325] mb-2">
              Pay 50% &amp; Glow On
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              Our apothecary bar fills and seals your bottle with fresh batch actives, deducting exactly 50% from the retail price.
            </p>
          </div>
        </div>

        {/* Store Locator Component */}
        <div className="bg-[#F5F0EA] rounded-3xl p-6 sm:p-10 border border-[#E2DDD5] shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E8ECE9]">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1C3325]">
                Partner Refill Store Locator
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Over 9 dedicated refill hubs across Tier 1 &amp; Tier 2 urban hubs in India
              </p>
            </div>

            {/* Pincode Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search city, area, pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white rounded-xl border border-[#D2DCD4] text-xs text-[#1C3325] placeholder:text-stone-400 focus:outline-hidden focus:border-[#758A7A]"
              />
            </div>
          </div>

          {/* City filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-4">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCity === c
                    ? 'bg-[#1C3325] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-[#D2DCD4]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Store List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
            {filteredStores.map((store) => {
              const status = getStoreStatus(store);
              const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${store.name}, ${store.address}`
              )}`;

              return (
                <div
                  key={store.id}
                  className="bg-white p-6 rounded-2xl border border-[#E8ECE9] hover:border-[#758A7A] transition-all shadow-2xs hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    {/* City & Real-time Live Open/Closed Status */}
                    <div className="flex items-center justify-between text-[11px] mb-2.5">
                      <span className="font-semibold text-[#758A7A] uppercase tracking-wider font-mono">
                        {store.city} · {store.area}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${status.badgeColor}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            status.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-stone-400'
                          }`}
                        />
                        <span>{status.label}</span>
                      </span>
                    </div>

                    {/* Store Name */}
                    <h4 className="text-base font-serif font-bold text-[#1C3325] leading-snug group-hover:text-[#43634E] transition-colors">
                      {store.name}
                    </h4>

                    {/* Contact & Hours */}
                    <div className="mt-3.5 space-y-2 text-xs text-stone-600 font-sans">
                      <p className="flex items-start gap-2 leading-relaxed">
                        <MapPin className="w-4 h-4 text-[#758A7A] shrink-0 mt-0.5" />
                        <span>{store.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#758A7A] shrink-0" />
                        <span>
                          {store.hours} <span className="text-[10px] text-stone-400">({status.detail})</span>
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#758A7A] shrink-0" />
                        <span className="font-mono">{store.phone}</span>
                      </p>
                    </div>
                  </div>

                  {/* Card Actions: Get Directions & 50% Refill marker */}
                  <div className="mt-5 pt-3.5 border-t border-[#F4EFEB] flex items-center justify-between">
                    <span className="text-emerald-800 font-semibold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>50% Refill Bar</span>
                    </span>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EBF0EC] text-[#1C3325] text-xs font-semibold rounded-lg border border-[#D2DCD4] transition-all hover:border-[#1C3325]"
                    >
                      <Navigation className="w-3 h-3 text-[#758A7A]" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
