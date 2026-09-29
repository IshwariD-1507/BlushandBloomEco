import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Pause, Play } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const total = TESTIMONIALS.length;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold mb-2">
            Real Experiences
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C3325]">
            Loved by Conscious Skin Enthusiasts
          </h2>
          <p className="mt-2 text-stone-600 text-sm font-sans">
            Hear from our community of over 2,500 active beauty lovers across India who made the switch to zero plastic.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-[#F4EFEB] rounded-3xl p-8 sm:p-12 border border-[#E2DDD5] shadow-md">
          {/* Big Quote watermark */}
          <Quote className="absolute top-6 right-8 w-16 h-16 text-[#D2DCD4]/40 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
            {/* Stars & Verified */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex text-amber-500">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-emerald-800 font-medium bg-[#EBF0EC] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Clean Purchase</span>
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg sm:text-xl font-serif italic text-[#1C3325] leading-relaxed my-2">
              "{activeTestimonial.quote}"
            </p>

            {/* Customer metadata */}
            <div className="mt-6 pt-4 border-t border-[#E8ECE9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif font-bold text-[#1C3325] text-base">
                  {activeTestimonial.name}
                </h4>
                <p className="text-xs text-stone-500 font-sans">
                  {activeTestimonial.location} · <span className="text-[#758A7A]">{activeTestimonial.concern}</span>
                </p>
              </div>

              <div className="text-xs text-stone-500 font-mono bg-white px-3 py-1 rounded-lg border border-[#E8ECE9]">
                Product: <span className="font-semibold text-[#1C3325]">{activeTestimonial.verifiedProduct}</span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#E8ECE9]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-white"
                title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx ? 'w-6 bg-[#1C3325]' : 'w-2 bg-[#D2DCD4]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white hover:bg-[#FAF8F5] text-stone-700 hover:text-stone-950 border border-[#D2DCD4] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-white hover:bg-[#FAF8F5] text-stone-700 hover:text-stone-950 border border-[#D2DCD4] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
