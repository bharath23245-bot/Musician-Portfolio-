import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Music2, Plus, Trash2, Edit3, Play, Pause, Disc } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { Track } from '../../types';
import { NewReleaseModal } from '../../components/admin/NewReleaseModal';

export const AdminMusic: React.FC = () => {
  const { tracks, addTrack, updateTrack, deleteTrack } = usePortfolioData();
  const { searchQuery = '' } = useOutletContext<{ searchQuery?: string }>();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);

  const filteredTracks = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrack) return;
    updateTrack(editingTrack);
    setEditingTrack(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            DISCOGRAPHY & MASTER RELEASES
          </span>
          <h1 className="text-2xl font-serif text-white">Music Releases ({tracks.length})</h1>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-5 py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Track</span>
        </button>
      </div>

      {/* Tracks Table */}
      <div className="rounded-xl bg-[#141518] border border-[#23252e] overflow-hidden shadow-xl">
        <div className="divide-y divide-[#1e2029]">
          {filteredTracks.map((t) => (
            <div
              key={t.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#181a20]/60 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-[#1c1d24] border border-[#2b2e3a] overflow-hidden flex-shrink-0">
                  <img src={t.coverUrl} alt={t.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate font-serif">{t.title}</h3>
                  <p className="text-xs text-[#8e93a3] truncate">
                    {t.subtitle} • <span className="text-[#c8a251]">{t.category}</span>
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#6e7382] font-mono mt-0.5">
                    <span>{t.duration}</span>
                    {t.keySignature && <span>• {t.keySignature}</span>}
                    {t.bpm && <span>• {t.bpm} BPM</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setEditingTrack(t)}
                  className="px-3 py-1.5 rounded bg-[#1c1e26] hover:bg-[#272935] text-[#b2b6c6] hover:text-white border border-[#2d303e] text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${t.title}" from your releases catalog?`)) {
                      deleteTrack(t.id);
                    }
                  }}
                  className="p-2 rounded bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40 transition-colors"
                  title="Delete track"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredTracks.length === 0 && (
            <div className="text-center py-12 text-xs text-[#757a8a]">
              No music tracks found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Edit Track Modal */}
      {editingTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-xl font-serif text-[#f2f4f8]">Edit Track Details</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8e93a3] mb-1 font-medium">Track Title *</label>
                <input
                  type="text"
                  required
                  value={editingTrack.title}
                  onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1 font-medium">Subtitle</label>
                  <input
                    type="text"
                    value={editingTrack.subtitle}
                    onChange={(e) => setEditingTrack({ ...editingTrack, subtitle: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1 font-medium">Category</label>
                  <input
                    type="text"
                    value={editingTrack.category}
                    onChange={(e) => setEditingTrack({ ...editingTrack, category: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1 font-medium">Duration</label>
                  <input
                    type="text"
                    value={editingTrack.duration}
                    onChange={(e) => setEditingTrack({ ...editingTrack, duration: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1 font-medium">Key Signature</label>
                  <input
                    type="text"
                    value={editingTrack.keySignature || ''}
                    onChange={(e) =>
                      setEditingTrack({ ...editingTrack, keySignature: e.target.value })
                    }
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1 font-medium">Cover URL</label>
                <input
                  type="url"
                  value={editingTrack.coverUrl}
                  onChange={(e) => setEditingTrack({ ...editingTrack, coverUrl: e.target.value })}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#c8a251] text-[#0b0c0e] font-semibold rounded-lg uppercase tracking-wider"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTrack(null)}
                  className="px-4 py-2.5 border border-[#2c2f3a] text-[#8e93a3] rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Track Modal */}
      <NewReleaseModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddTrack={addTrack}
      />
    </div>
  );
};
