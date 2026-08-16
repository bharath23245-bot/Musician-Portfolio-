// Service layer prepared for future Node.js + Express API integration
import {
  ArtistProfile,
  Track,
  BookingRequest,
  UpcomingEvent,
  VideoItem,
  GalleryItem,
  TestimonialItem,
} from '../types';
import {
  initialArtistProfile,
  initialTracks,
  initialBookings,
  initialEvents,
  initialVideos,
  initialGallery,
  initialTestimonials,
} from '../data/initialData';

const STORAGE_KEYS = {
  PROFILE: 'maestro_profile_data',
  TRACKS: 'maestro_tracks_data',
  BOOKINGS: 'maestro_bookings_data',
  EVENTS: 'maestro_events_data',
  VIDEOS: 'maestro_videos_data',
  GALLERY: 'maestro_gallery_data',
  TESTIMONIALS: 'maestro_testimonials_data',
};

// Generic storage helper (to be replaced with fetch('/api/...') once Express backend is attached)
function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export const portfolioApi = {
  // Profile
  getProfile: async (): Promise<ArtistProfile> => {
    return getStoredItem<ArtistProfile>(STORAGE_KEYS.PROFILE, initialArtistProfile);
  },
  updateProfile: async (profile: ArtistProfile): Promise<ArtistProfile> => {
    setStoredItem(STORAGE_KEYS.PROFILE, profile);
    return profile;
  },

  // Tracks
  getTracks: async (): Promise<Track[]> => {
    return getStoredItem<Track[]>(STORAGE_KEYS.TRACKS, initialTracks);
  },
  addTrack: async (track: Track): Promise<Track> => {
    const current = getStoredItem<Track[]>(STORAGE_KEYS.TRACKS, initialTracks);
    const updated = [track, ...current];
    setStoredItem(STORAGE_KEYS.TRACKS, updated);
    return track;
  },
  updateTrack: async (track: Track): Promise<Track> => {
    const current = getStoredItem<Track[]>(STORAGE_KEYS.TRACKS, initialTracks);
    const updated = current.map((t) => (t.id === track.id ? track : t));
    setStoredItem(STORAGE_KEYS.TRACKS, updated);
    return track;
  },
  deleteTrack: async (trackId: string): Promise<void> => {
    const current = getStoredItem<Track[]>(STORAGE_KEYS.TRACKS, initialTracks);
    const updated = current.filter((t) => t.id !== trackId);
    setStoredItem(STORAGE_KEYS.TRACKS, updated);
  },

  // Bookings
  getBookings: async (): Promise<BookingRequest[]> => {
    return getStoredItem<BookingRequest[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
  },
  addBooking: async (booking: BookingRequest): Promise<BookingRequest> => {
    const current = getStoredItem<BookingRequest[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const updated = [booking, ...current];
    setStoredItem(STORAGE_KEYS.BOOKINGS, updated);
    return booking;
  },
  updateBookingStatus: async (
    bookingId: string,
    status: 'Confirmed' | 'Pending' | 'Declined'
  ): Promise<void> => {
    const current = getStoredItem<BookingRequest[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const updated = current.map((b) => (b.id === bookingId ? { ...b, status } : b));
    setStoredItem(STORAGE_KEYS.BOOKINGS, updated);
  },

  // Events
  getEvents: async (): Promise<UpcomingEvent[]> => {
    return getStoredItem<UpcomingEvent[]>(STORAGE_KEYS.EVENTS, initialEvents);
  },
  addEvent: async (event: UpcomingEvent): Promise<UpcomingEvent> => {
    const current = getStoredItem<UpcomingEvent[]>(STORAGE_KEYS.EVENTS, initialEvents);
    const updated = [...current, event];
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
    return event;
  },
  updateEvent: async (event: UpcomingEvent): Promise<UpcomingEvent> => {
    const current = getStoredItem<UpcomingEvent[]>(STORAGE_KEYS.EVENTS, initialEvents);
    const updated = current.map((e) => (e.id === event.id ? event : e));
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
    return event;
  },
  deleteEvent: async (eventId: string): Promise<void> => {
    const current = getStoredItem<UpcomingEvent[]>(STORAGE_KEYS.EVENTS, initialEvents);
    const updated = current.filter((e) => e.id !== eventId);
    setStoredItem(STORAGE_KEYS.EVENTS, updated);
  },

  // Videos
  getVideos: async (): Promise<VideoItem[]> => {
    return getStoredItem<VideoItem[]>(STORAGE_KEYS.VIDEOS, initialVideos);
  },
  addVideo: async (video: VideoItem): Promise<VideoItem> => {
    const current = getStoredItem<VideoItem[]>(STORAGE_KEYS.VIDEOS, initialVideos);
    const updated = [video, ...current];
    setStoredItem(STORAGE_KEYS.VIDEOS, updated);
    return video;
  },
  deleteVideo: async (videoId: string): Promise<void> => {
    const current = getStoredItem<VideoItem[]>(STORAGE_KEYS.VIDEOS, initialVideos);
    const updated = current.filter((v) => v.id !== videoId);
    setStoredItem(STORAGE_KEYS.VIDEOS, updated);
  },

  // Gallery
  getGallery: async (): Promise<GalleryItem[]> => {
    return getStoredItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
  },
  addGalleryItem: async (item: GalleryItem): Promise<GalleryItem> => {
    const current = getStoredItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    const updated = [item, ...current];
    setStoredItem(STORAGE_KEYS.GALLERY, updated);
    return item;
  },
  deleteGalleryItem: async (itemId: string): Promise<void> => {
    const current = getStoredItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    const updated = current.filter((g) => g.id !== itemId);
    setStoredItem(STORAGE_KEYS.GALLERY, updated);
  },

  // Testimonials
  getTestimonials: async (): Promise<TestimonialItem[]> => {
    return getStoredItem<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },
  addTestimonial: async (item: TestimonialItem): Promise<TestimonialItem> => {
    const current = getStoredItem<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const updated = [item, ...current];
    setStoredItem(STORAGE_KEYS.TESTIMONIALS, updated);
    return item;
  },
  deleteTestimonial: async (id: string): Promise<void> => {
    const current = getStoredItem<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    const updated = current.filter((t) => t.id !== id);
    setStoredItem(STORAGE_KEYS.TESTIMONIALS, updated);
  },
};
