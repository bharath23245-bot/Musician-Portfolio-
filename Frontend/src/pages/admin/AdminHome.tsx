import React, { useState } from 'react';
import { Save, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const AdminHome: React.FC = () => {
  const { profile, updateProfile } = usePortfolioData();

  const [name, setName] = useState(profile.name);
  const [tagline, setTagline] = useState(profile.tagline);
  const [heroImage, setHeroImage] = useState(profile.heroImage);
  const [stageImage, setStageImage] = useState(profile.stageImage);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      tagline,
      heroImage,
      stageImage,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#20222a]">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            WEBSITE CUSTOMIZATION
          </span>
          <h1 className="text-2xl font-serif text-white">Homepage & Hero Section</h1>
        </div>
        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/50 border border-emerald-800 text-xs text-emerald-300">
            <Check className="w-3.5 h-3.5" />
            <span>Hero Updated Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4">
          <h2 className="text-base font-serif text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c8a251]" />
            <span>Artist Identity & Typography</span>
          </h2>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">Display Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">
              Hero Tagline / Subtitle (Serif Italic) *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4">
          <h2 className="text-base font-serif text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#c8a251]" />
            <span>Atmospheric Visual Backgrounds</span>
          </h2>

          <div className="space-y-2">
            <label className="block text-[#8e93a3] font-medium">Hero Stage Backdrop Image URL</label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-16 rounded overflow-hidden bg-black flex-shrink-0 border border-[#2d2f3c]">
                <img src={heroImage} alt="Hero preview" className="w-full h-full object-cover" />
              </div>
              <input
                type="url"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="flex-1 bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-[#8e93a3] font-medium">
              Contact / Booking CTA Stage Banner URL
            </label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-16 rounded overflow-hidden bg-black flex-shrink-0 border border-[#2d2f3c]">
                <img src={stageImage} alt="Stage preview" className="w-full h-full object-cover" />
              </div>
              <input
                type="url"
                value={stageImage}
                onChange={(e) => setStageImage(e.target.value)}
                className="flex-1 bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
