import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  User,
  Music2,
  Film,
  Image,
  CalendarCheck,
  Quote,
  Inbox,
  Settings,
  Plus,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useAuth } from '../../hooks/useAuth';

interface AdminSidebarProps {
  onOpenNewRelease: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onOpenNewRelease }) => {
  const { profile, bookings } = usePortfolioData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/home', label: 'Homepage / Hero', icon: Home },
    { to: '/admin/about', label: 'About & Bio', icon: User },
    { to: '/admin/music', label: 'Music Tracks', icon: Music2 },
    { to: '/admin/videos', label: 'Concert Videos', icon: Film },
    { to: '/admin/gallery', label: 'Stage Gallery', icon: Image },
    { to: '/admin/events', label: 'Tour Events', icon: CalendarCheck },
    { to: '/admin/testimonials', label: 'Press & Reviews', icon: Quote },
    {
      to: '/admin/bookings',
      label: 'Booking Requests',
      icon: Inbox,
      badge: pendingBookingsCount > 0 ? pendingBookingsCount : undefined,
    },
    { to: '/admin/settings', label: 'Settings & Security', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#141518] border-r border-[#20222a] flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-5">
        {/* Top Brand & Profile */}
        <div className="flex items-center justify-between px-2 py-2 border-b border-[#1f2128] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#1f2128] border border-[#2d303b] flex-shrink-0">
              <img
                src={profile.portraitImage}
                alt={profile.name}
                className="w-full h-full object-cover filter grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white font-serif tracking-wide truncate max-w-[120px]">
                {profile.name}
              </h2>
              <p className="text-[10px] text-[#c8a251] flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3" /> Admin Studio
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#2b2738] text-white border-l-2 border-[#c8a251] shadow-sm'
                      : 'text-[#8e93a3] hover:text-white hover:bg-[#1a1c22]'
                  }`
                }
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#e89895]/20 text-[#f0a8a8] border border-[#e89895]/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 border-t border-[#1f2128] space-y-2">
        <button
          id="sidebar-new-release-btn"
          onClick={onOpenNewRelease}
          className="w-full py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>New Track Release</span>
        </button>

        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="w-full py-2 bg-[#191b22] hover:bg-red-950/30 text-[#9ba0af] hover:text-red-300 border border-[#262934] hover:border-red-900/50 text-xs rounded transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
