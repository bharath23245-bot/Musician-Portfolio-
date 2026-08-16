import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { PublicPortfolio } from '../pages/public/PublicPortfolio';

// Admin Pages
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminHome } from '../pages/admin/AdminHome';
import { AdminAbout } from '../pages/admin/AdminAbout';
import { AdminMusic } from '../pages/admin/AdminMusic';
import { AdminVideos } from '../pages/admin/AdminVideos';
import { AdminGallery } from '../pages/admin/AdminGallery';
import { AdminEvents } from '../pages/admin/AdminEvents';
import { AdminTestimonials } from '../pages/admin/AdminTestimonials';
import { AdminBookings } from '../pages/admin/AdminBookings';
import { AdminSettings } from '../pages/admin/AdminSettings';

// Route Guard
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  // 1. Public Portfolio
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <PublicPortfolio />,
      },
    ],
  },

  // 2. Admin Authentication Route
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  // 3. Protected Admin Dashboard & Sub-routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'home',
        element: <AdminHome />,
      },
      {
        path: 'about',
        element: <AdminAbout />,
      },
      {
        path: 'music',
        element: <AdminMusic />,
      },
      {
        path: 'videos',
        element: <AdminVideos />,
      },
      {
        path: 'gallery',
        element: <AdminGallery />,
      },
      {
        path: 'events',
        element: <AdminEvents />,
      },
      {
        path: 'testimonials',
        element: <AdminTestimonials />,
      },
      {
        path: 'bookings',
        element: <AdminBookings />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
      },
    ],
  },

  // Catch-all fallback
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
