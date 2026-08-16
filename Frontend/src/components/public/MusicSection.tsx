import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Track } from '../../types';

interface MusicSectionProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
}) => {
  const [showAllReleases, setShowAllReleases] = useState(false);
  const displayedTracks = showAllReleases ? tracks : tracks.slice(0, 4);

  return (
    <section
      id="works-section"
      className="py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1a1b22]"
    >
      <div className="flex items-center justify-between pb-6 border-b border-[#20222a]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c8a251] font-semibold block mb-1">
            DISCOGRAPHY & COMPOSITIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f2f4f8] font-normal">
            Selected Works
          </h2>
        </div>

        {tracks.length > 4 && (
          <button
            onClick={() => setShowAllReleases(!showAllReleases)}
            className="text-[11px] uppercase tracking-widest text-[#8e93a3] hover:text-[#c8a251] transition-colors"
          >
            {showAllReleases ? 'SHOW LESS' : 'VIEW ALL RELEASES'}
          </button>
        )}
      </div>

      {/* Track List */}
      <div className="divide-y divide-[#1c1e26] mt-2">
        {displayedTracks.map((track) => {
          const isThisTrackPlaying = isPlaying && currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              className={`py-4 sm:py-5 flex items-center justify-between gap-4 group transition-colors px-3 -mx-3 rounded-lg ${
                isThisTrackPlaying ? 'bg-[#15161b]' : 'hover:bg-[#121316]'
              }`}
            >
              {/* Track Thumbnail & Title */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-12 h-12 rounded bg-[#1c1d22] border border-[#2b2c34] overflow-hidden flex-shrink-0">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isThisTrackPlaying && (
                    <div className="absolute inset-0 bg-[#c8a251]/30 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#c8a251] animate-ping"></span>
                    </div>
                  )}
                </div>

                <div className="truncate">
                  <h3 className="text-sm sm:text-base font-serif text-[#f1f3f7] group-hover:text-[#c8a251] transition-colors truncate">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#7d8291] truncate">
                    {track.subtitle} • <span className="text-[#9ea2b0]">{track.category}</span>
                  </p>
                </div>
              </div>

              {/* Duration & Play Control */}
              <div className="flex items-center gap-6 flex-shrink-0">
                <span className="text-xs font-mono text-[#7d8291]">
                  {track.duration}
                </span>

                <button
                  onClick={() => onPlayTrack(track)}
                  aria-label={`Play ${track.title}`}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isThisTrackPlaying
                      ? 'border-[#c8a251] bg-[#c8a251] text-[#0b0c0e] scale-105'
                      : 'border-[#383a45] text-[#9da2b2] hover:border-white hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isThisTrackPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
