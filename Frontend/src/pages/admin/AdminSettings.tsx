import React, { useState } from 'react';
import { Save, Check, Shield, Key, Mail, Phone, Globe, UserCheck } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useAuth } from '../../hooks/useAuth';

export const AdminSettings: React.FC = () => {
  const { profile, updateProfile } = usePortfolioData();
  const { user } = useAuth();

  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [managerName, setManagerName] = useState(profile.managerName);
  const [instagram, setInstagram] = useState(profile.instagram);
  const [spotify, setSpotify] = useState(profile.spotify);
  const [youtube, setYoutube] = useState(profile.youtube);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      email,
      phone,
      managerName,
      instagram,
      spotify,
      youtube,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#20222a]">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            MANAGEMENT & CONTACTS
          </span>
          <h1 className="text-2xl font-serif text-white">Settings & Social Channels</h1>
        </div>
        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/50 border border-emerald-800 text-xs text-emerald-300">
            <Check className="w-3.5 h-3.5" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {/* Account Info card */}
      <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4 text-xs">
        <h2 className="text-base font-serif text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#c8a251]" />
          <span>Active Authenticated Session</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-[#191a20] border border-[#262831]">
            <span className="text-[#727685] block mb-1">User Account</span>
            <span className="font-semibold text-white">{user?.name || profile.name}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#191a20] border border-[#262831]">
            <span className="text-[#727685] block mb-1">Admin Email</span>
            <span className="font-semibold text-white">{user?.email || 'manager@maestro.io'}</span>
          </div>
          <div className="p-3 rounded-lg bg-[#191a20] border border-[#262831]">
            <span className="text-[#727685] block mb-1">Security Role</span>
            <span className="font-semibold text-[#c8a251] uppercase">{user?.role || 'admin'}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Contact info */}
        <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4">
          <h2 className="text-base font-serif text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#c8a251]" />
            <span>Artist Representation & Public Inquiries</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">
                Official Inquiries Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Management Phone *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8e93a3] mb-1 font-medium">
              Lead Representative / Agency Name
            </label>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-xl bg-[#141518] border border-[#23252e] space-y-4">
          <h2 className="text-base font-serif text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#c8a251]" />
            <span>Streaming & Social Profiles</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Spotify Artist URL</label>
              <input
                type="url"
                value={spotify}
                onChange={(e) => setSpotify(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">Instagram Profile URL</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8e93a3] mb-1 font-medium">YouTube Channel URL</label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full bg-[#1a1b21] border border-[#2b2d38] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
