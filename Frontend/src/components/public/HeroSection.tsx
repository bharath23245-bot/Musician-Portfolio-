import React from 'react';
import { Play, ChevronDown } from 'lucide-react';
import { ArtistProfile, Track } from '../../types';

interface HeroSectionProps {
  profile: ArtistProfile;
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  onOpenBooking: (type?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  tracks,
  onPlayTrack,
  onOpenBooking,
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden"
    >
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={profile.heroImage}
          alt={`${profile.name} performing at grand piano`}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform filter brightness-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/60 to-[#0b0c0e]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0b0c0e]/40 to-[#0b0c0e]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-12">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-[0.08em] font-normal text-white uppercase leading-none drop-shadow-2xl">
          {profile.name}
        </h1>

        <p className="text-sm sm:text-base md:text-lg italic font-serif text-[#c5c8d4] tracking-wide max-w-md mx-auto">
          {profile.tagline}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-book-me-btn"
            onClick={() => onOpenBooking('Live Performances')}
            className="w-44 py-3.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-lg active:scale-95"
          >
            BOOK ME
          </button>

          <button
            id="hero-listen-now-btn"
            onClick={() => {
              if (tracks.length > 0) {
                onPlayTrack(tracks[0]);
              }
            }}
            className="w-44 py-3.5 bg-black/40 hover:bg-white/10 text-white border border-[#444855] hover:border-white font-medium text-xs uppercase tracking-widest rounded-sm backdrop-blur-sm transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>LISTEN NOW</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about-section')}
        aria-label="Scroll to About section"
        className="absolute bottom-8 z-10 text-[#8e93a3] hover:text-white transition-colors animate-bounce p-2"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};
