import React from 'react';
import { TestimonialItem } from '../../types';
import { Quote, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section
      id="testimonials-section"
      className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1a1b22]"
    >
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#c8a251] font-semibold block">
          CRITICAL ACCLAIM & PRESS
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] font-normal">
          Reviews & Reflections
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-8 rounded-xl bg-[#121316] border border-[#23252d] flex flex-col justify-between space-y-6 relative group hover:border-[#c8a251]/50 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Quote className="w-7 h-7 text-[#c8a251]/60" />
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#c8a251] fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm font-serif italic text-[#cacedd] leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#1d1f27]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                {item.author}
              </h4>
              <p className="text-[11px] text-[#8e93a3]">{item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
