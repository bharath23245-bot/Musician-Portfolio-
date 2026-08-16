import React from 'react';
import { Search, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AdminHeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchQuery = '',
  onSearchChange,
}) => {
  const { user } = useAuth();
  const displayName = user?.name || 'Bharath Kannan';

  return (
    <header className="h-16 border-b border-[#1f2128] px-6 sm:px-10 flex items-center justify-between gap-4 bg-[#111216]/60 backdrop-blur-md">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636877]" />
        <input
          type="text"
          placeholder="Search releases, events, or inquiries..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full bg-[#16171b] border border-[#262831] focus:border-[#c8a251] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-[#636877] focus:outline-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* User indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181a20] border border-[#272933] text-xs">
          <div className="w-5 h-5 rounded-full bg-[#c8a251] text-[#0b0c0e] flex items-center justify-center font-bold text-[10px]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="text-[#e1e3e6] font-medium max-w-[140px] truncate">{displayName}</span>
        </div>

        {/* View Live Portfolio (Opens in new tab) */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-1.5 rounded-lg bg-[#1a1c22] hover:bg-[#232630] border border-[#2b2e3a] text-xs text-[#c8a251] hover:text-[#d6b25f] flex items-center gap-1.5 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden md:inline">View Public Site</span>
        </a>
      </div>
    </header>
  );
};
