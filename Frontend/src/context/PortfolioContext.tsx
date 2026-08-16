import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ArtistProfile,
  Track,
  BookingRequest,
  UpcomingEvent,
  VideoItem,
  GalleryItem,
  TestimonialItem,
} from '../types';
import { portfolioApi } from '../services/api';
import {
  initialArtistProfile,
  initialTracks,
  initialBookings,
  initialEvents,
  initialVideos,
  initialGallery,
  initialTestimonials,
} from '../data/initialData';

interface PortfolioContextType {
  profile: ArtistProfile;
  tracks: Track[];
  bookings: BookingRequest[];
  events: UpcomingEvent[];
  videos: VideoItem[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  loading: boolean;
  updateProfile: (newProfile: ArtistProfile) => Promise<void>;
  addTrack: (track: Track) => Promise<void>;
  updateTrack: (track: Track) => Promise<void>;
  deleteTrack: (trackId: string) => Promise<void>;
  addBooking: (booking: BookingRequest) => Promise<void>;
  updateBookingStatus: (id: string, status: 'Confirmed' | 'Pending' | 'Declined') => Promise<void>;
  addEvent: (event: UpcomingEvent) => Promise<void>;
  updateEvent: (event: UpcomingEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addVideo: (video: VideoItem) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  addTestimonial: (item: TestimonialItem) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ArtistProfile>(initialArtistProfile);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [bookings, setBookings] = useState<BookingRequest[]>(initialBookings);
  const [events, setEvents] = useState<UpcomingEvent[]>(initialEvents);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [prof, trks, bks, evts, vids, gals, tests] = await Promise.all([
          portfolioApi.getProfile(),
          portfolioApi.getTracks(),
          portfolioApi.getBookings(),
          portfolioApi.getEvents(),
          portfolioApi.getVideos(),
          portfolioApi.getGallery(),
          portfolioApi.getTestimonials(),
        ]);
        setProfile(prof);
        setTracks(trks);
        setBookings(bks);
        setEvents(evts);
        setVideos(vids);
        setGallery(gals);
        setTestimonials(tests);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const updateProfile = async (newProfile: ArtistProfile) => {
    const updated = await portfolioApi.updateProfile(newProfile);
    setProfile(updated);
  };

  const addTrack = async (track: Track) => {
    const added = await portfolioApi.addTrack(track);
    setTracks((prev) => [added, ...prev]);
  };

  const updateTrack = async (track: Track) => {
    const updated = await portfolioApi.updateTrack(track);
    setTracks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTrack = async (trackId: string) => {
    await portfolioApi.deleteTrack(trackId);
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  };

  const addBooking = async (booking: BookingRequest) => {
    const added = await portfolioApi.addBooking(booking);
    setBookings((prev) => [added, ...prev]);
  };

  const updateBookingStatus = async (id: string, status: 'Confirmed' | 'Pending' | 'Declined') => {
    await portfolioApi.updateBookingStatus(id, status);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const addEvent = async (event: UpcomingEvent) => {
    const added = await portfolioApi.addEvent(event);
    setEvents((prev) => [...prev, added]);
  };

  const updateEvent = async (event: UpcomingEvent) => {
    const updated = await portfolioApi.updateEvent(event);
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteEvent = async (id: string) => {
    await portfolioApi.deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const addVideo = async (video: VideoItem) => {
    const added = await portfolioApi.addVideo(video);
    setVideos((prev) => [added, ...prev]);
  };

  const deleteVideo = async (id: string) => {
    await portfolioApi.deleteVideo(id);
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const addGalleryItem = async (item: GalleryItem) => {
    const added = await portfolioApi.addGalleryItem(item);
    setGallery((prev) => [added, ...prev]);
  };

  const deleteGalleryItem = async (id: string) => {
    await portfolioApi.deleteGalleryItem(id);
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const addTestimonial = async (item: TestimonialItem) => {
    const added = await portfolioApi.addTestimonial(item);
    setTestimonials((prev) => [added, ...prev]);
  };

  const deleteTestimonial = async (id: string) => {
    await portfolioApi.deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        tracks,
        bookings,
        events,
        videos,
        gallery,
        testimonials,
        loading,
        updateProfile,
        addTrack,
        updateTrack,
        deleteTrack,
        addBooking,
        updateBookingStatus,
        addEvent,
        updateEvent,
        deleteEvent,
        addVideo,
        deleteVideo,
        addGalleryItem,
        deleteGalleryItem,
        addTestimonial,
        deleteTestimonial,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioProvider');
  }
  return context;
};
