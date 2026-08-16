import React, { useState } from 'react';
import { Image, Plus, Trash2, MapPin, X } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { GalleryItem } from '../../types';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = usePortfolioData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('NCPA Tata Theatre, Mumbai');
  const [year, setYear] = useState('2024');
  const [category, setCategory] = useState('Concert Stage');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      location: location.trim(),
      year: year.trim(),
      category: category.trim(),
      imageUrl: imageUrl.trim(),
    };

    addGalleryItem(newItem);
    setTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            VISUAL MOMENTS
          </span>
          <h1 className="text-2xl font-serif text-white">Stage Gallery ({gallery.length})</h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#141518] border border-[#23252e] overflow-hidden flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase text-[#c8a251] font-semibold">
                  {item.category} • {item.year}
                </span>
                <h3 className="text-sm font-serif text-white font-medium">{item.title}</h3>
                <p className="text-[11px] text-[#717686] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#c8a251]" /> {item.location}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-end border-t border-[#1d1f27] mt-2">
              <button
                onClick={() => {
                  if (confirm(`Delete "${item.title}" from stage gallery?`)) {
                    deleteGalleryItem(item.id);
                  }
                }}
                className="p-1.5 rounded bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#23252f]">
              <h3 className="text-xl font-serif">Add Stage Photograph</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#8e93a3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8e93a3] mb-1">Photograph Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Concerto Cadenza in Spotlight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1">Location / Venue</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c8a251] text-[#0b0c0e] font-semibold rounded-lg uppercase tracking-wider"
                >
                  Publish Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
