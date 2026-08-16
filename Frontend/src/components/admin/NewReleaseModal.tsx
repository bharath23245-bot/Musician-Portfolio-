import React, { useState } from 'react';
import { X, Music2 } from 'lucide-react';
import { Track } from '../../types';

interface NewReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrack: (track: Track) => void;
}

export const NewReleaseModal: React.FC<NewReleaseModalProps> = ({
  isOpen,
  onClose,
  onAddTrack,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('Solo Piano');
  const [category, setCategory] = useState('Classical / Solo Piano');
  const [duration, setDuration] = useState('4:15');
  const [coverUrl, setCoverUrl] = useState(
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
  );
  const [keySignature, setKeySignature] = useState('D Minor');
  const [bpm, setBpm] = useState(68);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const [mins, secs] = duration.split(':').map((n) => parseInt(n) || 0);
    const durationSec = mins * 60 + secs;

    const track: Track = {
      id: `${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      category: category.trim(),
      duration: duration.trim() || '4:00',
      durationSec: durationSec || 240,
      coverUrl: coverUrl.trim(),
      releaseDate: 'Just Added',
      plays: 0,
      bpm: bpm || 68,
      keySignature: keySignature.trim(),
      isFeatured: true,
    };

    onAddTrack(track);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-[#23252f]">
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-[#c8a251]" />
            <h3 className="text-xl font-serif text-[#f2f4f8]">Publish New Track</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8e93a3] hover:text-white p-1 rounded hover:bg-[#20222a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">Track Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Nocturne in D Minor"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Subtitle / Instrumentation</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Solo Piano"
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Genre / Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Solo Piano"
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Duration (M:SS)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="4:30"
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Key Signature</label>
              <input
                type="text"
                value={keySignature}
                onChange={(e) => setKeySignature(e.target.value)}
                placeholder="D Minor"
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Tempo (BPM)</label>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value) || 60)}
                placeholder="68"
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">Album Artwork URL</label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#c8a251] hover:bg-[#d4b059] text-[#0b0c0e] font-semibold rounded-lg text-xs uppercase tracking-wider transition-colors shadow-md active:scale-98"
            >
              Publish Track to Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
