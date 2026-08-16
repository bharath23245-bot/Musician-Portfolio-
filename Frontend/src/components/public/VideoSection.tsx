import React, { useState } from 'react';
import { Play, Film, ExternalLink } from 'lucide-react';
import { VideoItem } from '../../types';

interface VideoSectionProps {
  videos: VideoItem[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <section
      id="videos-section"
      className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1a1b22]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c8a251] font-semibold block mb-1">
            CINEMATIC PERFORMANCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] font-normal">
            Concerts & Masterclasses
          </h2>
        </div>
        <p className="text-xs text-[#8e93a3] max-w-md">
          Live concert hall captures, acoustic improvisations, and archival film recordings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {videos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setSelectedVideo(vid)}
            className="group relative bg-[#131417] border border-[#23252d] rounded-lg overflow-hidden cursor-pointer hover:border-[#c8a251]/60 transition-all shadow-lg"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-[#1a1c22]">
              <img
                src={vid.thumbnailUrl}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#c8a251]/90 group-hover:bg-[#c8a251] text-[#0b0c0e] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                {vid.duration}
              </span>
            </div>

            {/* Info */}
            <div className="p-4 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#c8a251] font-medium">
                {vid.category}
              </span>
              <h3 className="text-sm font-serif font-medium text-white group-hover:text-[#c8a251] transition-colors line-clamp-2">
                {vid.title}
              </h3>
              <div className="text-[11px] text-[#717685] pt-1 flex items-center justify-between">
                <span>{vid.views}</span>
                <span className="inline-flex items-center gap-1 text-[#8e93a3] group-hover:text-white transition-colors">
                  Watch Recording <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#141518] border border-[#2c2f3a] rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#23252e]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c8a251]">
                  {selectedVideo.category}
                </span>
                <h3 className="text-lg font-serif text-white">{selectedVideo.title}</h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-[#8e93a3] hover:text-white px-3 py-1 rounded bg-[#1e2027] text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center space-y-3 p-6 bg-black/70 rounded-xl backdrop-blur-sm max-w-md">
                <Film className="w-10 h-10 text-[#c8a251] mx-auto" />
                <h4 className="text-white font-serif text-lg">{selectedVideo.title}</h4>
                <p className="text-xs text-[#a0a4b4]">
                  High-fidelity concert session audio stream is synchronized in the player below.
                </p>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-2 bg-[#c8a251] text-[#0b0c0e] font-semibold text-xs rounded uppercase tracking-wider"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
