import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { UpcomingEvent } from '../../types';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: UpcomingEvent) => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
}) => {
  const [title, setTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [month, setMonth] = useState('FEB');
  const [day, setDay] = useState('18');
  const [year, setYear] = useState('2025');
  const [time, setTime] = useState('8:00 PM IST');
  const [ticketUrl, setTicketUrl] = useState('https://in.bookmyshow.com');
  const [status, setStatus] = useState<'Upcoming' | 'Sold Out' | 'Completed'>('Upcoming');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !venue.trim()) return;

    const ev: UpcomingEvent = {
      id: `EV-${Date.now()}`,
      title: title.trim(),
      venue: venue.trim(),
      location: location.trim() || 'Mumbai, Maharashtra',
      month: month.toUpperCase().trim(),
      day: day.trim(),
      fullDate: `${month} ${day}, ${year}`,
      time: time.trim(),
      ticketUrl: ticketUrl.trim(),
      status: status,
    };

    onAddEvent(ev);
    setTitle('');
    setVenue('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-[#23252f]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#c8a251]" />
            <h3 className="text-xl font-serif text-[#f2f4f8]">Schedule Tour Event</h3>
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
            <label className="block text-[#8e93a3] mb-1 font-medium">Concert / Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Symphony Gala & Piano Concerto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Month (e.g. NOV)</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Day (1-31)</label>
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">Concert Hall / Venue *</label>
            <input
              type="text"
              required
              placeholder="e.g. NCPA Tata Theatre"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">City, State / Country</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Performance Time</label>
              <input
                type="text"
                placeholder="e.g. 8:00 PM IST"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Ticket Booking Link</label>
              <input
                type="url"
                value={ticketUrl}
                onChange={(e) => setTicketUrl(e.target.value)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Ticket Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#1b1d24] border border-[#2c2f3a] focus:border-[#c8a251] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#c8a251] hover:bg-[#d4b059] text-[#0b0c0e] font-semibold rounded-lg text-xs uppercase tracking-wider transition-colors shadow-md active:scale-98"
            >
              Add Event to Concert Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
