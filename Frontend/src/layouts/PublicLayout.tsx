import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { AudioPlayerBar } from '../components/common/AudioPlayerBar';
import { BioModal } from '../components/common/BioModal';
import { BookingModal } from '../components/common/BookingModal';
import { audioEngine } from '../utils/audioEngine';
import { Track } from '../types';

export const PublicLayout: React.FC = () => {
  const { profile, tracks, addBooking } = usePortfolioData();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedBookingType, setPreselectedBookingType] = useState('Live Performances');

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioEngine.pause();
        setIsPlaying(false);
      } else {
        audioEngine.resume();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      audioEngine.play(track.id, track.durationSec || 240, 0);
    }
  };

  const handlePlayPause = () => {
    if (!currentTrack && tracks.length > 0) {
      handlePlayTrack(tracks[0]);
      return;
    }
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.resume();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (!tracks.length) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    const nextTrack = tracks[nextIndex];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
    audioEngine.play(nextTrack.id, nextTrack.durationSec || 240, 0);
  };

  const handlePrevTrack = () => {
    if (!tracks.length) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    const prevTrack = tracks[prevIndex];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
    audioEngine.play(prevTrack.id, prevTrack.durationSec || 240, 0);
  };

  const handleOpenBooking = (type: string = 'Live Performances') => {
    setPreselectedBookingType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e1e3e6]">
      {/* Routed Child Components */}
      <Outlet
        context={{
          currentTrack,
          isPlaying,
          onPlayTrack: handlePlayTrack,
          onOpenBooking: handleOpenBooking,
          onOpenBio: () => setIsBioOpen(true),
        }}
      />

      {/* Persistent Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
      />

      {/* Bio Modal */}
      <BioModal
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
        profile={profile}
        onBookMe={() => handleOpenBooking('Live Performances')}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmitBooking={addBooking}
        preselectedType={preselectedBookingType}
        artistName={profile.name}
      />
    </div>
  );
};
