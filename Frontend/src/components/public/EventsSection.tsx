import React from 'react';
import { UpcomingEvent } from '../../types';
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react';

interface EventsSectionProps {
  events: UpcomingEvent[];
  onOpenBooking: (type?: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, onOpenBooking }) => {
  return (
    <section
      id="events-section"
      className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#1a1b22]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c8a251] font-semibold block mb-1">
            CONCERT SCHEDULE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] font-normal">
            Upcoming Tour Dates & Recitals
          </h2>
        </div>
        <button
          onClick={() => onOpenBooking('Live Performances')}
          className="text-xs uppercase tracking-widest text-[#c8a251] hover:underline font-medium"
        >
          Book An Appearance →
        </button>
      </div>

      <div className="divide-y divide-[#1e2029] mt-2">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#121317]/60 px-4 -mx-4 rounded-xl transition-all"
          >
            {/* Date Box & Event Info */}
            <div className="flex items-start sm:items-center gap-5 min-w-0">
              <div className="w-14 h-14 rounded-lg bg-[#191b22] border border-[#272934] flex flex-col items-center justify-center flex-shrink-0 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c8a251]">
                  {evt.month}
                </span>
                <span className="text-xl font-serif font-bold text-white leading-none">
                  {evt.day}
                </span>
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="text-base sm:text-lg font-serif text-white font-medium truncate">
                  {evt.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8e93a3]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c8a251]" /> {evt.venue}
                  </span>
                  <span>•</span>
                  <span>{evt.location}</span>
                  {evt.time && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#a5aab9]">
                        <Clock className="w-3 h-3" /> {evt.time}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3 flex-shrink-0 self-start md:self-center">
              <span
                className={`px-3 py-1 rounded text-[11px] font-medium ${
                  evt.status === 'Sold Out'
                    ? 'bg-red-950/40 text-red-300 border border-red-800/40'
                    : 'bg-[#181a20] text-[#c8a251] border border-[#c8a251]/30'
                }`}
              >
                {evt.status}
              </span>

              {evt.ticketUrl && evt.status !== 'Sold Out' ? (
                <a
                  href={evt.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve Seats</span>
                </a>
              ) : (
                <button
                  onClick={() => onOpenBooking('Live Performances')}
                  className="px-5 py-2 bg-[#1b1d24] hover:bg-[#252832] text-white border border-[#303340] text-xs uppercase tracking-wider rounded transition-all"
                >
                  Inquire
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
