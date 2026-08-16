import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Camera, MapPin, X } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section
      id="gallery-section"
      className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1a1b22]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c8a251] font-semibold block mb-1">
            VISUAL ARCHIVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] font-normal">
            Stage & Recital Gallery
          </h2>
        </div>
        <p className="text-xs text-[#8e93a3] max-w-md">
          Moments captured across premier European and Asian auditoriums.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {gallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#15161b] border border-[#23252e] cursor-pointer shadow-lg hover:border-[#c8a251]/60 transition-all"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-90 group-hover:brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
              <span className="text-[10px] uppercase tracking-wider text-[#c8a251] font-semibold">
                {item.category} • {item.year}
              </span>
              <h4 className="text-sm font-serif text-white font-medium">{item.title}</h4>
              <p className="text-[11px] text-[#b0b4c2] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#c8a251]" /> {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#121316] border border-[#2b2d38] rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#c8a251] hover:text-[#0b0c0e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            <div className="p-5 flex items-center justify-between bg-[#141518] border-t border-[#23252d]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c8a251] font-semibold">
                  {activeImage.category} • {activeImage.year}
                </span>
                <h3 className="text-base font-serif text-white">{activeImage.title}</h3>
                <p className="text-xs text-[#8e93a3] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c8a251]" /> {activeImage.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
