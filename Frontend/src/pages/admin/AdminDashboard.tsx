import React from 'react';
import { Link } from 'react-router-dom';
import {
  Music2,
  CalendarCheck,
  Inbox,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Film,
  Image,
  Quote,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const AdminDashboard: React.FC = () => {
  const { profile, tracks, events, bookings, videos, gallery, testimonials } = usePortfolioData();

  const totalPlays = tracks.reduce((acc, t) => acc + (t.plays || 0), 0);
  const pendingBookings = bookings.filter((b) => b.status === 'Pending');
  const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed');

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#181a20] via-[#14151a] to-[#121317] border border-[#272935] shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#c8a251] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mastero Artist Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif text-white font-normal">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#8e93a3] max-w-xl">
            Live overview of your acoustic portfolio, scheduled concerts across India and Europe, and incoming booking requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/bookings"
            className="px-5 py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>Review Inquiries ({pendingBookings.length})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#141518] border border-[#23252e] space-y-3">
          <div className="flex items-center justify-between text-[#8e93a3]">
            <span className="text-xs font-medium uppercase tracking-wider">Catalog Tracks</span>
            <Music2 className="w-4 h-4 text-[#c8a251]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-white">{tracks.length}</span>
            <span className="text-xs text-emerald-400 font-mono">Published</span>
          </div>
          <p className="text-[11px] text-[#6b707e]">All tracks playable on public portfolio</p>
        </div>

        <div className="p-5 rounded-xl bg-[#141518] border border-[#23252e] space-y-3">
          <div className="flex items-center justify-between text-[#8e93a3]">
            <span className="text-xs font-medium uppercase tracking-wider">Total Streams</span>
            <TrendingUp className="w-4 h-4 text-[#c8a251]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-white">
              {totalPlays.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400 font-mono">+18% this month</span>
          </div>
          <p className="text-[11px] text-[#6b707e]">Synthesizer & Web Audio sessions</p>
        </div>

        <div className="p-5 rounded-xl bg-[#141518] border border-[#23252e] space-y-3">
          <div className="flex items-center justify-between text-[#8e93a3]">
            <span className="text-xs font-medium uppercase tracking-wider">Tour Dates</span>
            <CalendarCheck className="w-4 h-4 text-[#c8a251]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-white">{events.length}</span>
            <span className="text-xs text-[#c8a251] font-mono">Upcoming</span>
          </div>
          <p className="text-[11px] text-[#6b707e]">NCPA, NMACC, Music Academy</p>
        </div>

        <div className="p-5 rounded-xl bg-[#141518] border border-[#23252e] space-y-3">
          <div className="flex items-center justify-between text-[#8e93a3]">
            <span className="text-xs font-medium uppercase tracking-wider">Inquiries</span>
            <Inbox className="w-4 h-4 text-[#c8a251]" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-white">{bookings.length}</span>
            <span className="text-xs text-amber-400 font-mono">{pendingBookings.length} Pending</span>
          </div>
          <p className="text-[11px] text-[#6b707e]">Direct concert hall & studio proposals</p>
        </div>
      </div>

      {/* Two Columns: Recent Inquiries & Quick Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Recent Inquiries */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#20222a]">
            <h3 className="text-lg font-serif text-white">Recent Booking Proposals</h3>
            <Link
              to="/admin/bookings"
              className="text-xs text-[#c8a251] hover:underline flex items-center gap-1"
            >
              View All ({bookings.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-[#141518] border border-[#242630] flex items-center justify-between gap-4 hover:border-[#383a48] transition-all"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white truncate">{b.client}</h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
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
                  <p className="text-xs text-[#8e93a3] truncate">
                    {b.eventType} • {b.venue || b.location}
                  </p>
                  <p className="text-[11px] text-[#c8a251] font-mono">{b.budget}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] text-[#6b707e] block">{b.date}</span>
                  <Link
                    to="/admin/bookings"
                    className="text-xs text-[#c8a251] hover:underline inline-block mt-1"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Management Modules */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#20222a]">
            <h3 className="text-lg font-serif text-white">Portfolio Content Modules</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link
              to="/admin/home"
              className="p-4 rounded-xl bg-[#141518] border border-[#23252e] hover:border-[#c8a251] transition-colors space-y-2 group"
            >
              <span className="text-[10px] text-[#c8a251] uppercase tracking-wider font-semibold block">
                Module
              </span>
              <h4 className="font-semibold text-white group-hover:text-[#c8a251] transition-colors">
                Hero & Brand
              </h4>
              <p className="text-[11px] text-[#787d8d]">Artist name, tagline, background images</p>
            </Link>

            <Link
              to="/admin/about"
              className="p-4 rounded-xl bg-[#141518] border border-[#23252e] hover:border-[#c8a251] transition-colors space-y-2 group"
            >
              <span className="text-[10px] text-[#c8a251] uppercase tracking-wider font-semibold block">
                Module
              </span>
              <h4 className="font-semibold text-white group-hover:text-[#c8a251] transition-colors">
                About & Bio
              </h4>
              <p className="text-[11px] text-[#787d8d]">Portrait photo, philosophies, full bio</p>
            </Link>

            <Link
              to="/admin/music"
              className="p-4 rounded-xl bg-[#141518] border border-[#23252e] hover:border-[#c8a251] transition-colors space-y-2 group"
            >
              <span className="text-[10px] text-[#c8a251] uppercase tracking-wider font-semibold block">
                Module
              </span>
              <h4 className="font-semibold text-white group-hover:text-[#c8a251] transition-colors">
                Music Releases
              </h4>
              <p className="text-[11px] text-[#787d8d]">{tracks.length} compositions in catalog</p>
            </Link>

            <Link
              to="/admin/videos"
              className="p-4 rounded-xl bg-[#141518] border border-[#23252e] hover:border-[#c8a251] transition-colors space-y-2 group"
            >
              <span className="text-[10px] text-[#c8a251] uppercase tracking-wider font-semibold block">
                Module
              </span>
              <h4 className="font-semibold text-white group-hover:text-[#c8a251] transition-colors">
                Concert Videos
              </h4>
              <p className="text-[11px] text-[#787d8d]">{videos.length} performance recordings</p>
            </Link>

            <Link
              to="/admin/gallery"
              className="p-4 rounded-xl bg-[#141518] border border-[#23252e] hover:border-[#c8a251] transition-colors space-y-2 group"
            >
              <span className="text-[10px] text-[#c8a251] uppercase tracking-wider font-semibold block">
                Module
              </span>
              <h4 className="font-semibold text-white group-hover:text-[#c8a251] transition-colors">
                Stage Gallery
              </h4>
              <p className="text-[11px] text-[#787d8d]">{gallery.length} visual captures</p>
            </Link>

            <Link
              to="/admin/events"
              className="p-4 rounded-xl bg-[#141518] border border-[#23252e] hover:border-[#c8a251] transition-colors space-y-2 group"
            >
              <span className="text-[10px] text-[#c8a251] uppercase tracking-wider font-semibold block">
                Module
              </span>
              <h4 className="font-semibold text-white group-hover:text-[#c8a251] transition-colors">
                Tour Dates
              </h4>
              <p className="text-[11px] text-[#787d8d]">{events.length} auditorium bookings</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
