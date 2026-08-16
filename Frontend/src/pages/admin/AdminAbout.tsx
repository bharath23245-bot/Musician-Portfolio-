import React, { useState } from 'react';
import { Save, Check, UserCheck, BookOpen } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const AdminAbout: React.FC = () => {
  const { profile, updateProfile } = usePortfolioData();

  const [quote, setQuote] = useState(profile.quote);
  const [bioParagraph1, setBioParagraph1] = useState(profile.bioParagraph1);
  const [bioParagraph2, setBioParagraph2] = useState(profile.bioParagraph2);
  const [fullBio, setFullBio] = useState(profile.fullBio);
  const [portraitImage, setPortraitImage] = useState(profile.portraitImage);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      quote,
      bioParagraph1,
      bioParagraph2,
      fullBio,
      portraitImage,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#20222a]">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            BIOGRAPHY & PHILOSOPHY
          </span>
          <h1 className="text-2xl font-serif text-white">About Section & Full Bio</h1>
        </div>
        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/50 border border-emerald-800 text-xs text-emerald-300">
            <Check className="w-3.5 h-3.5" />
            <span>Bio Updated Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4">
          <h2 className="text-base font-serif text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#c8a251]" />
            <span>Portrait & Primary Philosophy Quote</span>
          </h2>

          <div className="space-y-2">
            <label className="block text-[#8e93a3] font-medium">Portrait Artwork URL</label>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-20 rounded overflow-hidden bg-black flex-shrink-0 border border-[#2d2f3c]">
                <img
                  src={portraitImage}
                  alt="Portrait preview"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <input
                type="url"
                value={portraitImage}
                onChange={(e) => setPortraitImage(e.target.value)}
                className="flex-1 bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">Featured Philosophy Quote *</label>
            <textarea
              rows={2}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">
                Public Overview Paragraph 1
              </label>
              <textarea
                rows={4}
                value={bioParagraph1}
                onChange={(e) => setBioParagraph1(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">
                Public Overview Paragraph 2
              </label>
              <textarea
                rows={4}
                value={bioParagraph2}
                onChange={(e) => setBioParagraph2(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg p-3 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4">
          <h2 className="text-base font-serif text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c8a251]" />
            <span>Comprehensive Modal Biography</span>
          </h2>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">
              Full Biography Content (Separate paragraphs with blank lines)
            </label>
            <textarea
              rows={7}
              value={fullBio}
              onChange={(e) => setFullBio(e.target.value)}
              className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg p-3 text-xs text-white focus:outline-none leading-relaxed transition-colors font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Biography Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
