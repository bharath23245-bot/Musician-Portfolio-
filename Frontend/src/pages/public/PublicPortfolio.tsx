import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { Track } from '../../types';
import { PublicNavbar } from '../../components/public/PublicNavbar';
import { HeroSection } from '../../components/public/HeroSection';
import { AboutSection } from '../../components/public/AboutSection';
import { MusicSection } from '../../components/public/MusicSection';
import { VideoSection } from '../../components/public/VideoSection';
import { GallerySection } from '../../components/public/GallerySection';
import { EventsSection } from '../../components/public/EventsSection';
import { TestimonialsSection } from '../../components/public/TestimonialsSection';
import { ContactSection } from '../../components/public/ContactSection';
import { PublicFooter } from '../../components/public/PublicFooter';

interface PublicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onOpenBooking: (type?: string) => void;
  onOpenBio: () => void;
}

export const PublicPortfolio: React.FC = () => {
  const { profile, tracks, events, videos, gallery, testimonials } = usePortfolioData();
  const { currentTrack, isPlaying, onPlayTrack, onOpenBooking, onOpenBio } =
    useOutletContext<PublicContextType>();

  return (
    <div className="min-w-full bg-[#0b0c0e] text-[#e1e3e6] font-sans pb-28">
      {/* 1. Header Navigation (Public only - No Admin button) */}
      <PublicNavbar onOpenBooking={onOpenBooking} />

      {/* 2. Hero Section */}
      <HeroSection
        profile={profile}
        tracks={tracks}
        onPlayTrack={onPlayTrack}
        onOpenBooking={onOpenBooking}
      />

      {/* 3. About Section */}
      <AboutSection profile={profile} onOpenBio={onOpenBio} />

      {/* 4. Selected Works / Music Section */}
      <MusicSection
        tracks={tracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayTrack={onPlayTrack}
      />

      {/* 5. Video Performances */}
      <VideoSection videos={videos} />

      {/* 6. Gallery Section */}
      <GallerySection gallery={gallery} />

      {/* 7. Concert Schedule / Events Section */}
      <EventsSection events={events} onOpenBooking={onOpenBooking} />

      {/* 8. Press & Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 9. Available For Services & Booking CTA */}
      <ContactSection profile={profile} onOpenBooking={onOpenBooking} />

      {/* 10. Footer (Public only - No Admin button) */}
      <PublicFooter profile={profile} />
    </div>
  );
};
