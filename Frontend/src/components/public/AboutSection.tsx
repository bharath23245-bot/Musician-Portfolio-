import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArtistProfile } from '../../types';

interface AboutSectionProps {
  profile: ArtistProfile;
  onOpenBio: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, onOpenBio }) => {
  return (
    <section
      id="about-section"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Atmospheric Musician Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-sm overflow-hidden bg-[#16171b] border border-[#262832] shadow-2xl group">
            <img
              src={profile.portraitImage}
              alt={`Portrait of ${profile.name}`}
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>

        {/* Right: Artist Statement & Bio */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f2f4f8] font-normal leading-snug">
            {profile.quote}
          </h2>

          <div className="w-16 h-0.5 bg-[#c8a251]"></div>

          <div className="space-y-4 text-[#a3a7b6] text-sm sm:text-base leading-relaxed">
            <p>{profile.bioParagraph1}</p>
            <p>{profile.bioParagraph2}</p>
          </div>

          <div className="pt-2">
            <button
              id="read-full-bio-btn"
              onClick={onOpenBio}
              className="text-xs uppercase tracking-[0.2em] text-[#e5e7eb] hover:text-[#c8a251] font-semibold border-b border-[#4b4e5b] hover:border-[#c8a251] pb-1 transition-all inline-flex items-center gap-1.5"
            >
              <span>READ FULL BIOGRAPHY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
