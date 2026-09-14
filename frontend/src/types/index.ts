// ============================================
// Sara's Beauty & Bridal Studio — Type Definitions
// ============================================

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  page_slug: string;
  display_order: number;
  is_active: boolean;
}

export interface Service {
  id: string;
  category_id: string;
  category_name?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  price_type: 'FIXED' | 'STARTS_FROM';
  duration: string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number | null;
  price_type: 'FIXED' | 'STARTS_FROM' | 'CONTACT';
  tier: 'SIGNATURE' | 'LUXE' | 'ROYAL';
  included_services: string[];
  is_active: boolean;
  display_order: number;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  experience: string;
  photo_url: string;
  instagram_url: string;
  is_active: boolean;
  display_order: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  booking_reference: string;
  customer_id: string;
  service_id: string;
  artist_id: string | null;
  appointment_date: string;
  appointment_time: string;
  customer_name: string;
  phone: string;
  email: string;
  special_request: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  service?: Service;
  artist?: Artist;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  image_type: 'NORMAL' | 'BEFORE' | 'AFTER' | 'BEFORE_AFTER';
  before_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  photo_url: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

export interface SiteSettings {
  business_name: string;
  brand_name: string;
  tagline: string;
  primary_phone: string;
  secondary_phone: string;
  landline: string;
  whatsapp_number: string;
  email: string;
  instagram_handle: string;
  instagram_url: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  pincode: string;
  landmark: string;
  google_maps_url: string;
  opening_hours: string;
  logo_url: string;
  hero_image_url: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface TrustStat {
  value: string;
  label: string;
}

export interface ExperienceOption {
  id: string;
  label: string;
  icon: string;
  recommendedServices: string[];
}
