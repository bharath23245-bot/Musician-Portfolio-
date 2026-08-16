import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Mail, User, Music } from 'lucide-react';
import { BookingRequest } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (booking: BookingRequest) => void;
  preselectedType?: string;
  artistName?: string;
}

const POPULAR_INDIAN_VENUES = [
  { name: 'NCPA Tata Theatre', city: 'Mumbai, Maharashtra' },
  { name: 'The Grand Theatre, NMACC', city: 'Mumbai, Maharashtra' },
  { name: 'Siri Fort Auditorium', city: 'New Delhi' },
  { name: 'The Music Academy', city: 'Chennai, Tamil Nadu' },
  { name: 'Chowdiah Memorial Hall', city: 'Bengaluru, Karnataka' },
  { name: 'Prithvi Theatre', city: 'Mumbai, Maharashtra' },
  { name: 'Science City Auditorium', city: 'Kolkata, West Bengal' },
  { name: 'Ravindra Bharathi', city: 'Hyderabad, Telangana' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmitBooking,
  preselectedType = 'Live Performances',
  artistName = 'Bharath Kannan',
}) => {
  const [client, setClient] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState(preselectedType);
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('₹1,50,000 – ₹3,00,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSelectVenuePreset = (presetVenue: string, presetCity: string) => {
    setVenue(presetVenue);
    setLocation(presetCity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !email) return;

    const newBooking: BookingRequest = {
      id: `BK-${Math.floor(100 + Math.random() * 900)}`,
      client,
      email,
      phone,
      eventType,
      date: date || 'Flexible / 2025',
      rawDate: date,
      venue: venue || 'NCPA Tata Theatre, Mumbai',
      location: location || 'Mumbai, Maharashtra, India',
      budget,
      message: message || 'Inquiry regarding concert booking / commission in India.',
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitBooking(newBooking);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#141518] border border-[#262830] rounded-xl p-6 sm:p-8 text-[#e1e3e6] shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8b909f] hover:text-white p-1 rounded-md hover:bg-[#1e2027] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c8a251]/20 border border-[#c8a251] flex items-center justify-center mx-auto text-[#c8a251]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-[#f4f4f6]">
              Inquiry Dispatched to Management
            </h3>
            <p className="text-sm text-[#9ca0b0] max-w-md mx-auto">
              Thank you, {client}. {artistName}’s Indian representation will review the date and venue details and respond within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#c8a251] font-semibold">
                Artist Representation • India Tours & Recitals
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#f3f4f7] mt-1">
                Booking & Commission Inquiry
              </h2>
              <p className="text-xs text-[#8f94a3] mt-1.5">
                Direct management contact for concert engagements across premier Indian auditoriums, studio sessions, and bespoke film scoring.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                    Client / Organization *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#696d7b]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. NCPA Mumbai / Foundation"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#696d7b]" />
                    <input
                      type="email"
                      required
                      placeholder="curator@venue.org.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                    Engagement Type
                  </label>
                  <div className="relative">
                    <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#696d7b]" />
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Live Performances">Live Performance / Solo Recital</option>
                      <option value="Guest Conductor">Guest Conductor / Concerto</option>
                      <option value="Studio Sessions">Studio Sessions / Recording</option>
                      <option value="Score Composition">Original Film Score / Composition</option>
                      <option value="Private Salon">Private Salon Recital</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                    Target Date / Window
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#696d7b]" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                    Venue / Hall in India
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#696d7b]" />
                    <input
                      type="text"
                      placeholder="e.g. NCPA Tata Theatre, Mumbai"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                    Budget Allocation (INR / ₹)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c8a251] font-semibold text-sm select-none">
                      ₹
                    </div>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="₹75,000 – ₹1,50,000">₹75,000 – ₹1,50,000</option>
                      <option value="₹1,50,000 – ₹3,00,000">₹1,50,000 – ₹3,00,000</option>
                      <option value="₹3,00,000 – ₹5,00,000">₹3,00,000 – ₹5,00,000</option>
                      <option value="₹5,00,000 – ₹10,00,000+">₹5,00,000 – ₹10,00,000+ (Tour / Feature Score)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Venue Suggestion Chips for India */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase tracking-wider text-[#737887]">
                  Popular Indian Venues:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_INDIAN_VENUES.slice(0, 5).map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => handleSelectVenuePreset(v.name, v.city)}
                      className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                        venue === v.name
                          ? 'border-[#c8a251] bg-[#c8a251]/20 text-[#f5d78e]'
                          : 'border-[#262832] bg-[#17181e] text-[#8e93a3] hover:border-[#404452] hover:text-white'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                  Project Notes / Repertoire Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your event acoustics, acoustic grand piano model (e.g. Steinway Model D / Yamaha CFX), city/state in India, rehearsal schedule, or score requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#1b1c21] border border-[#2c2f38] focus:border-[#c8a251] rounded-lg p-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold rounded-lg tracking-wider transition-colors shadow-lg active:scale-[0.99]"
                >
                  TRANSMIT BOOKING PROPOSAL (₹)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
