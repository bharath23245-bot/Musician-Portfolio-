import React, { useState } from 'react';
import { Film, Plus, Trash2, ExternalLink, X } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { VideoItem } from '../../types';

export const AdminVideos: React.FC = () => {
  const { videos, addVideo, deleteVideo } = usePortfolioData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Concert Hall Recording');
  const [duration, setDuration] = useState('8:45');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1520523839898-50712825e3a7?auto=format&fit=crop&w=600&q=80'
  );
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [views, setViews] = useState('14.2K views');

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newVid: VideoItem = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      duration: duration.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      videoUrl: videoUrl.trim(),
      views: views.trim(),
    };

    addVideo(newVid);
    setTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            CINEMATIC ARCHIVE
          </span>
          <h1 className="text-2xl font-serif text-white">Concert Videos ({videos.length})</h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Concert Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-xl bg-[#141518] border border-[#23252e] overflow-hidden flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                  {vid.duration}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase text-[#c8a251] font-semibold">
                  {vid.category}
                </span>
                <h3 className="text-sm font-serif text-white font-medium line-clamp-2">
                  {vid.title}
                </h3>
                <p className="text-[11px] text-[#717686]">{vid.views}</p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-[#1d1f27] mt-2">
              <span className="text-[11px] text-[#8e93a3] truncate max-w-[150px]">
                {vid.videoUrl}
              </span>
              <button
                onClick={() => {
                  if (confirm(`Remove "${vid.title}" from public videos?`)) {
                    deleteVideo(vid.id);
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

      {/* Add Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#23252f]">
              <h3 className="text-xl font-serif">Add Concert Video Recording</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#8e93a3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddVideo} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8e93a3] mb-1">Performance Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Concerto No. 2 at NCPA"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
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
                  <label className="block text-[#8e93a3] mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1">Video Stream / YouTube Link</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c8a251] text-[#0b0c0e] font-semibold rounded-lg uppercase tracking-wider"
                >
                  Publish Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
