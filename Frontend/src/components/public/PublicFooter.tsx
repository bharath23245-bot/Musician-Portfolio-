import React from 'react';
import { ArtistProfile } from '../../types';

interface PublicFooterProps {
  profile: ArtistProfile;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ profile }) => {
  return (
    <footer className="border-t border-[#1a1b22] pt-14 pb-12 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-xs text-[#7a7f8e]">
      <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
        <div>
          <h4 className="text-xl font-serif tracking-[0.2em] text-white font-normal mb-2">
            MAESTRO
          </h4>
          <p className="text-xs text-[#878c9c] max-w-sm">
            Music. Performance. Expression. Bringing cinematic minimalism to the modern ear.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="flex items-center gap-4">
            <a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={profile.spotify}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Spotify
            </a>
            <a
              href={profile.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-[#17181e] text-center text-[#555966] text-[11px]">
        © {new Date().getFullYear()} MAESTRO. Music. Performance. Expression. All rights reserved.
      </div>
    </footer>
  );
};
