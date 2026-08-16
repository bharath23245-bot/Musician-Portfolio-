import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Inbox,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
} from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { BookingRequest, BookingStatus } from '../../types';

export const AdminBookings: React.FC = () => {
  const { bookings, updateBookingStatus } = usePortfolioData();
  const { searchQuery = '' } = useOutletContext<{ searchQuery?: string }>();

  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(
    bookings[0] || null
  );
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, status: BookingStatus) => {
    updateBookingStatus(bookingId, status as any);
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            ENGAGEMENT PROPOSALS
          </span>
          <h1 className="text-2xl font-serif text-white">
            Booking & Commission Inquiries ({bookings.length})
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#141518] border border-[#23252e] text-xs">
          {['All', 'Pending', 'Confirmed', 'Declined'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === st
                  ? 'bg-[#c8a251] text-[#0b0c0e] font-semibold shadow-sm'
                  : 'text-[#8e93a3] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Bookings List */}
        <div className="lg:col-span-5 rounded-xl bg-[#141518] border border-[#23252e] overflow-hidden flex flex-col h-[650px] shadow-xl">
          <div className="p-3.5 border-b border-[#20222a] bg-[#111216] text-xs font-semibold text-[#8e93a3] uppercase tracking-wider">
            Inquiries Catalog
          </div>

          <div className="divide-y divide-[#1e2029] overflow-y-auto flex-1">
            {filteredBookings.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'bg-[#1e212b] border-l-2 border-[#c8a251]' : 'hover:bg-[#181a21]/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white truncate font-serif">
                      {b.client}
                    </h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0 ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                          : b.status === 'Declined'
                          ? 'bg-red-950/40 text-red-400 border border-red-800/40'
                          : 'bg-amber-950/40 text-amber-400 border border-amber-800/40'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#8e93a3] truncate">{b.eventType}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#636877] pt-2">
                    <span className="text-[#c8a251] font-mono">{b.budget}</span>
                    <span>{b.date}</span>
                  </div>
                </div>
              );
            })}

            {filteredBookings.length === 0 && (
              <div className="text-center py-16 text-xs text-[#757a8a]">
                No inquiries matching filter.
              </div>
            )}
          </div>
        </div>

        {/* Right 7 cols: Detailed View */}
        <div className="lg:col-span-7 rounded-xl bg-[#141518] border border-[#23252e] p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[650px]">
          {selectedBooking ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c8a251] font-semibold">
                    Proposal {selectedBooking.id}
                  </span>
                  <h2 className="text-2xl font-serif text-white font-medium">
                    {selectedBooking.client}
                  </h2>
                  <p className="text-xs text-[#8e93a3]">
                    Submitted {selectedBooking.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'Confirmed')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      selectedBooking.status === 'Confirmed'
                        ? 'bg-emerald-500 text-black'
                        : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'Pending')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      selectedBooking.status === 'Pending'
                        ? 'bg-amber-500 text-black'
                        : 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Hold</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, 'Declined')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      selectedBooking.status === 'Declined'
                        ? 'bg-red-500 text-black'
                        : 'bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>

              {/* Booking Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-[#1a1b22] border border-[#272935] space-y-1">
                  <span className="text-[10px] uppercase text-[#737887] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c8a251]" /> Requested Date
                  </span>
                  <div className="font-semibold text-white text-sm">{selectedBooking.date}</div>
                </div>

                <div className="p-4 rounded-lg bg-[#1a1b22] border border-[#272935] space-y-1">
                  <span className="text-[10px] uppercase text-[#737887] font-semibold flex items-center gap-1.5">
                    <span className="text-[#c8a251] font-bold">₹</span> Proposed Budget
                  </span>
                  <div className="font-semibold text-white text-sm font-mono text-[#c8a251]">
                    {selectedBooking.budget}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#1a1b22] border border-[#272935] space-y-1">
                  <span className="text-[10px] uppercase text-[#737887] font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c8a251]" /> Venue / Hall
                  </span>
                  <div className="font-semibold text-white">{selectedBooking.venue}</div>
                  <div className="text-[#8e93a3] text-[11px]">{selectedBooking.location}</div>
                </div>

                <div className="p-4 rounded-lg bg-[#1a1b22] border border-[#272935] space-y-1">
                  <span className="text-[10px] uppercase text-[#737887] font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#c8a251]" /> Contact Representative
                  </span>
                  <div className="font-semibold text-white">{selectedBooking.email}</div>
                  {selectedBooking.phone && (
                    <div className="text-[#8e93a3] text-[11px] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#c8a251]" /> {selectedBooking.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Note */}
              <div className="p-5 rounded-lg bg-[#1a1b22] border border-[#272935] space-y-2">
                <span className="text-[10px] uppercase text-[#737887] font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#c8a251]" /> Engagement Notes & Repertoire
                </span>
                <p className="text-xs text-[#cfd3de] leading-relaxed whitespace-pre-wrap">
                  {selectedBooking.message}
                </p>
              </div>

              {/* Quick Reply Button */}
              <div className="pt-2">
                <a
                  href={`mailto:${selectedBooking.email}?subject=RE: ${encodeURIComponent(
                    selectedBooking.eventType
                  )} Booking with Bharath Kannan`}
                  className="w-full py-3 bg-[#1e2028] hover:bg-[#282a35] text-white border border-[#303340] rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-semibold"
                >
                  <Mail className="w-4 h-4 text-[#c8a251]" />
                  <span>Send Management Email Reply</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-32 text-xs text-[#757a8a]">
              Select an inquiry to view comprehensive booking specifics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
