import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArtistProfile } from '../../types';

interface ContactSectionProps {
  profile: ArtistProfile;
  onOpenBooking: (type?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenBooking }) => {
  return (
    <div>
      {/* Services / Available For */}
      <section
        id="services-section"
        className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1a1b22]"
      >
        <div className="mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c8a251] font-semibold">
            AVAILABLE FOR
          </span>
        </div>

        <div className="divide-y divide-[#1e2029]">
          {/* Item 1: Live Performances */}
          <div
            onClick={() => onOpenBooking('Live Performances')}
            className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group cursor-pointer hover:bg-[#121317]/50 px-3 -mx-3 rounded-xl transition-all"
          >
            <div className="md:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] group-hover:text-[#c8a251] transition-colors">
                Live Performances
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-sm text-[#9599a8] leading-relaxed">
                Solo recitals, concerto appearances with orchestras, and private luxury events. Delivering an immersive, high-fidelity acoustic experience tailored to prestigious venues.
              </p>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <ArrowRight className="w-5 h-5 text-[#595d6c] group-hover:text-[#c8a251] group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Item 2: Studio Sessions */}
          <div
            onClick={() => onOpenBooking('Studio Sessions')}
            className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group cursor-pointer hover:bg-[#121317]/50 px-3 -mx-3 rounded-xl transition-all"
          >
            <div className="md:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] group-hover:text-[#c8a251] transition-colors">
                Studio Sessions
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-sm text-[#9599a8] leading-relaxed">
                Professional session playing for film scores, commercial recordings, and contemporary albums. Bringing nuanced interpretation and technical precision to your recording.
              </p>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <ArrowRight className="w-5 h-5 text-[#595d6c] group-hover:text-[#c8a251] group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Item 3: Composition */}
          <div
            onClick={() => onOpenBooking('Score Composition')}
            className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group cursor-pointer hover:bg-[#121317]/50 px-3 -mx-3 rounded-xl transition-all"
          >
            <div className="md:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] group-hover:text-[#c8a251] transition-colors">
                Composition
              </h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-sm text-[#9599a8] leading-relaxed">
                Original scoring for visual media, bespoke commissions for ensembles, and collaborative songwriting. Crafting evocative sonic landscapes that elevate the narrative.
              </p>
            </div>
            <div className="md:col-span-1 flex justify-end">
              <ArrowRight className="w-5 h-5 text-[#595d6c] group-hover:text-[#c8a251] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Inquire Banner */}
      <section
        id="contact-section"
        className="relative py-28 px-6 sm:px-12 text-center overflow-hidden border-t border-[#1a1b22]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={profile.stageImage}
            alt="Concert stage grand piano"
            className="w-full h-full object-cover opacity-20 filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/80 to-[#0b0c0e]"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8e93a3] block font-sans">
            LET'S CREATE SOMETHING MEMORABLE.
          </span>

          <p className="text-sm sm:text-base text-[#b9bdcb] max-w-lg mx-auto leading-relaxed">
            Available for international bookings, commissions, and collaborations.
          </p>

          <div className="pt-4">
            <button
              id="cta-inquire-now-btn"
              onClick={() => onOpenBooking('Live Performances')}
              className="px-10 py-4 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-xl active:scale-95"
            >
              INQUIRE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
