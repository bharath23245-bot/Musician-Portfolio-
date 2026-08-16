import React, { useState, useEffect } from 'react';
import { Track } from '../../types';
import { audioEngine } from '../../utils/audioEngine';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3, Radio } from 'lucide-react';

interface AudioPlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onClose?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.85);

  useEffect(() => {
    if (currentTrack) {
      setDuration(currentTrack.durationSec || 240);
      setCurrentTime(0);
    }
  }, [currentTrack]);

  useEffect(() => {
    audioEngine.setTimeUpdateListener((time) => {
      setCurrentTime(time);
    });
    audioEngine.setEndListener(() => {
      onNextTrack();
    });
  }, [onNextTrack]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioEngine.seek(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    audioEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume || 0.8);
      audioEngine.setVolume(prevVolume || 0.8);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
      audioEngine.setVolume(0);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e0f12]/95 backdrop-blur-xl border-t border-[#22242c] shadow-2xl transition-all duration-300">
      {/* Top micro progress indicator line */}
      <div className="w-full bg-[#1c1e24] h-1 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#dfba68] to-[#c8a251] transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Track Information & Album Art */}
        <div className="flex items-center gap-3 min-w-0 w-1/4 sm:w-1/3">
          <div className="relative w-12 h-12 rounded bg-[#1f2128] overflow-hidden flex-shrink-0 border border-[#2d303b]">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className={`w-full h-full object-cover ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-700`}
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-[#c8a251] animate-spin" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-serif font-medium text-white tracking-wide truncate">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-[#8e93a3] truncate">
              {currentTrack.subtitle} • <span className="text-[#c8a251]">{currentTrack.category}</span>
            </p>
          </div>
        </div>

        {/* Center: Playback Controls & Scrubber */}
        <div className="flex flex-col items-center flex-1 max-w-lg">
          <div className="flex items-center gap-4 sm:gap-6 mb-1.5">
            <button
              id="player-prev-btn"
              onClick={onPrevTrack}
              className="text-[#8e93a3] hover:text-white transition-colors active:scale-95"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <button
              id="player-play-pause-btn"
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] flex items-center justify-center transition-all shadow-md active:scale-95"
              title={isPlaying ? 'Pause' : 'Play Synthesized Piano'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              id="player-next-btn"
              onClick={onNextTrack}
              className="text-[#8e93a3] hover:text-white transition-colors active:scale-95"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="w-full flex items-center gap-2 text-[10px] text-[#717684]">
            <span className="w-8 text-right font-mono">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-[#262831] rounded-lg appearance-none cursor-pointer accent-[#c8a251]"
            />
            <span className="w-8 font-mono">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Synthesizer Live Indicator & Volume Control */}
        <div className="hidden sm:flex items-center justify-end gap-4 w-1/4 sm:w-1/3 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#17181e] border border-[#262831] text-[10px] text-[#9da2b2]">
            <Radio className={`w-3 h-3 ${isPlaying ? 'text-[#c8a251] animate-pulse' : 'text-[#636877]'}`} />
            <span>Acoustic Synth</span>
          </div>

          <div className="flex items-center gap-2 text-[#8e93a3]">
            <button onClick={toggleMute} className="hover:text-white transition-colors">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 lg:w-20 h-1 bg-[#262831] rounded-lg appearance-none cursor-pointer accent-[#c8a251]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
