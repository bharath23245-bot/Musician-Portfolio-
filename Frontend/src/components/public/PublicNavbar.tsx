import React from 'react';

interface PublicNavbarProps {
  onOpenBooking: (type?: string) => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenBooking }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[#0b0c0e]/85 backdrop-blur-md border-b border-[#1c1d22]/60 transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero-section');
          }}
          className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-normal text-white hover:text-[#c8a251] transition-colors"
        >
          MAESTRO
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-widest text-[#9ea2b0]">
          <button
            onClick={() => scrollToSection('hero-section')}
            className="text-[#c8a251] hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about-section')}
            className="hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('works-section')}
            className="hover:text-white transition-colors"
          >
            Music
          </button>
          <button
            onClick={() => scrollToSection('videos-section')}
            className="hover:text-white transition-colors"
          >
            Videos
          </button>
          <button
            onClick={() => scrollToSection('gallery-section')}
            className="hover:text-white transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection('events-section')}
            className="hover:text-white transition-colors"
          >
            Events
          </button>
          <button
            onClick={() => scrollToSection('testimonials-section')}
            className="hover:text-white transition-colors"
          >
            Press
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            id="portfolio-book-me-header-btn"
            onClick={() => onOpenBooking('Live Performances')}
            className="px-5 sm:px-6 py-2 bg-[#c8a251] hover:bg-[#d4b059] text-[#0b0c0e] font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md active:scale-95"
          >
            BOOK ME
          </button>
        </div>
      </div>
    </header>
  );
};
