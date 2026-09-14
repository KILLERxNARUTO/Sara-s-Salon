import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Pages
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { BridalPage } from '@/pages/BridalPage';
import { PackagesPage } from '@/pages/PackagesPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { TeamPage } from '@/pages/TeamPage';
import { TestimonialsPage } from '@/pages/TestimonialsPage';
import { ContactPage } from '@/pages/ContactPage';
import { BookingPage } from '@/pages/BookingPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Website Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="bridal" element={<BridalPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book" element={<BookingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Dashboard Placeholder Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="text-xl font-serif">Admin Dashboard Overview</div>} />
          <Route path="dashboard" element={<div className="text-xl font-serif">Admin Dashboard Overview</div>} />
          <Route path="services" element={<div className="text-xl font-serif">Manage Services & Pricing</div>} />
          <Route path="gallery" element={<div className="text-xl font-serif">Manage Gallery Artistry</div>} />
          <Route path="team" element={<div className="text-xl font-serif">Manage Master Stylists</div>} />
          <Route path="testimonials" element={<div className="text-xl font-serif">Manage Testimonials</div>} />
          <Route path="settings" element={<div className="text-xl font-serif">Studio Settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
