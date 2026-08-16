import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { NewReleaseModal } from '../components/admin/NewReleaseModal';
import { usePortfolioData } from '../hooks/usePortfolioData';

export const AdminLayout: React.FC = () => {
  const { addTrack } = usePortfolioData();
  const [showNewReleaseModal, setShowNewReleaseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0e0f12] text-[#e1e3e6] flex flex-col md:flex-row font-sans">
      {/* Admin Sidebar Navigation */}
      <AdminSidebar onOpenNewRelease={() => setShowNewReleaseModal(true)} />

      {/* Main Admin Content Canvas */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0e0f12] overflow-y-auto">
        {/* Top Header Bar */}
        <AdminHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Dynamic Nested Admin Pages */}
        <div className="flex-1 p-6 sm:p-10">
          <Outlet context={{ searchQuery }} />
        </div>
      </main>

      {/* Quick New Release Modal */}
      <NewReleaseModal
        isOpen={showNewReleaseModal}
        onClose={() => setShowNewReleaseModal(false)}
        onAddTrack={addTrack}
      />
    </div>
  );
};
