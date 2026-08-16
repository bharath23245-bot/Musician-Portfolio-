import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Edit3, MapPin, Clock, Ticket } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { UpcomingEvent } from '../../types';
import { AddEventModal } from '../../components/admin/AddEventModal';

export const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = usePortfolioData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UpcomingEvent | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    updateEvent(editingEvent);
    setEditingEvent(null);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            CONCERT TOUR SCHEDULE
          </span>
          <h1 className="text-2xl font-serif text-white">Upcoming Events ({events.length})</h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Tour Date</span>
        </button>
      </div>

      <div className="rounded-xl bg-[#141518] border border-[#23252e] overflow-hidden shadow-xl">
        <div className="divide-y divide-[#1e2029]">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#181a20]/60 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-lg bg-[#1a1c23] border border-[#2c2f3d] flex flex-col items-center justify-center flex-shrink-0 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#c8a251]">
                    {evt.month}
                  </span>
                  <span className="text-lg font-serif font-bold text-white">{evt.day}</span>
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white truncate font-serif">
                      {evt.title}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        evt.status === 'Sold Out'
                          ? 'bg-red-950/40 text-red-300 border border-red-800/40'
                          : 'bg-[#1b1e28] text-[#c8a251] border border-[#c8a251]/30'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8e93a3] truncate flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#c8a251]" /> {evt.venue}
                    </span>
                    <span>•</span>
                    <span>{evt.location}</span>
                    {evt.time && <span>• {evt.time}</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                <button
                  onClick={() => setEditingEvent(evt)}
                  className="px-3 py-1.5 rounded bg-[#1c1e26] hover:bg-[#272935] text-[#b2b6c6] hover:text-white border border-[#2d303e] text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove event "${evt.title}" from schedule?`)) {
                      deleteEvent(evt.id);
                    }
                  }}
                  className="p-2 rounded bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12 text-xs text-[#757a8a]">
              No tour dates scheduled.
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-xl font-serif">Edit Tour Date</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8e93a3] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1">Month</label>
                  <input
                    type="text"
                    value={editingEvent.month}
                    onChange={(e) => setEditingEvent({ ...editingEvent, month: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1">Day</label>
                  <input
                    type="text"
                    value={editingEvent.day}
                    onChange={(e) => setEditingEvent({ ...editingEvent, day: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1">Venue *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1">Location</label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, status: e.target.value as any })
                    }
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#8e93a3] mb-1">Ticket URL</label>
                <input
                  type="url"
                  value={editingEvent.ticketUrl || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, ticketUrl: e.target.value })}
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
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2.5 border border-[#2c2f3a] text-[#8e93a3] rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={addEvent}
      />
    </div>
  );
};
