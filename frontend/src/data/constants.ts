// ============================================
// Sara's Beauty & Bridal Studio — Business Constants
// ============================================

import type { NavigationLink, SiteSettings, TrustStat, ExperienceOption } from '@/types';

// ---- Business Information (Source of Truth) ----
export const BUSINESS_INFO: SiteSettings = {
  business_name: "Sara's Beauty & Bridal Studio",
  brand_name: "Sara's Makeover Artistry",
  tagline: "Beauty And Bridal Studio",
  primary_phone: '9790690628',
  secondary_phone: '9940099380',
  landline: '044-48555426',
  whatsapp_number: '919790690628',
  email: 'Sarasbeautyandbridalstudio@gmail.com',
  instagram_handle: '@saras_beauty_and_bridal_studio',
  instagram_url: 'https://www.instagram.com/saras_beauty_and_bridal_studio/',
  address_line_1: 'No:77, Mahalakshmi Nagar',
  address_line_2: 'Main Road',
  city: 'Guduvanchery - 603 202',
  pincode: '603202',
  landmark: 'Near NPR Mandapam',
  google_maps_url: 'https://maps.app.goo.gl/Kfnfiuj1XD1TVM6H7',
  opening_hours: '',
  logo_url: '',
  hero_image_url: '',
};

// ---- Navigation Links ----
export const NAV_LINKS: NavigationLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Bridal', href: '/bridal' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

// ---- Trust Statistics (editable placeholders) ----
export const TRUST_STATS: TrustStat[] = [
  { value: '10+', label: 'Years of Experience' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '500+', label: 'Bridal Makeovers' },
  { value: '100%', label: 'Personalized Care' },
];

// ---- Phone Links ----
export const PHONE_LINKS = {
  primary: 'tel:+919790690628',
  secondary: 'tel:+919940099380',
  landline: 'tel:+914448555426',
};

// ---- Email Link ----
export const EMAIL_LINK = 'mailto:Sarasbeautyandbridalstudio@gmail.com';

// ---- WhatsApp ----
export const WHATSAPP_NUMBER = '919790690628';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ---- Service Page Slugs ----
export const SERVICE_PAGE_SLUGS = [
  'threading',
  'waxing',
  'facial',
  'skin',
  'hair',
  'manicure-pedicure',
  'bleach',
  'mehendi',
  'bridal',
] as const;

// ---- Experience Finder Options ----
export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  {
    id: 'wedding',
    label: 'My Wedding',
    icon: '💍',
    recommendedServices: ['Bridal Mehendi', 'Bridal (O3+)', 'Bridal (Lotus)', 'Saree Draping', 'Saree Pre-Pleating & Box Folding'],
  },
  {
    id: 'engagement',
    label: 'Engagement',
    icon: '✨',
    recommendedServices: ['Party', 'Hair Styling', 'Full Hand Mehendi', 'Blow Dry Setting'],
  },
  {
    id: 'reception',
    label: 'Reception',
    icon: '🎉',
    recommendedServices: ['Party', 'Blow Dry Setting', 'Ironing', 'Saree Draping'],
  },
  {
    id: 'party',
    label: 'Party',
    icon: '🥂',
    recommendedServices: ['Party', 'Blow Dry Setting', 'Ironing', 'Clean Up'],
  },
  {
    id: 'selfcare',
    label: 'Self Care',
    icon: '🧖‍♀️',
    recommendedServices: ['Diamond', 'Coconut Oil', 'Hair Spa', 'Classic Manicure', 'Classic Pedicure'],
  },
  {
    id: 'hair',
    label: 'Hair Refresh',
    icon: '💇‍♀️',
    recommendedServices: ['Layer Cut', 'Blow Dry Setting', 'Hair Coloring', 'Hair Spa'],
  },
  {
    id: 'skin',
    label: 'Skin Care',
    icon: '🌸',
    recommendedServices: ['Vitamin-C', 'Skin Brightening', 'Anti-Tan', 'Dark Neck Treatment', 'Under Eye Treatment'],
  },
  {
    id: 'relaxation',
    label: 'Relaxation',
    icon: '🕊️',
    recommendedServices: ['Coconut Oil', 'Olive Oil', 'Hair Spa', 'Crystal Pedicure', 'Crystal Manicure'],
  },
  {
    id: 'kids',
    label: 'Kids',
    icon: '👧',
    recommendedServices: ['Baby Cut', 'Mushroom Cut', 'Pop Cut'],
  },
];

// ---- Signature Service Categories for Homepage ----
export const SIGNATURE_CATEGORIES = [
  {
    name: 'Bridal',
    slug: 'bridal',
    description: 'Complete bridal transformation with expert makeup, hair styling, and mehendi artistry',
    icon: '👰',
    image: '/images/services/Bridal.png',
  },
  {
    name: 'Hair',
    slug: 'hair',
    description: 'Expert cuts, coloring, treatments, and styling for every occasion',
    icon: '💇‍♀️',
    image: '/images/services/hair.jpg',
  },
  {
    name: 'Skin',
    slug: 'skin',
    description: 'Premium facials, skin treatments, and rejuvenating care',
    icon: '✨',
    image: '/images/services/skin.jpg',
  },
  {
    name: 'Spa',
    slug: 'spa',
    description: 'Relaxing hot oil massages, manicures, and pedicures',
    icon: '🧖‍♀️',
    image: '/images/services/spa.jpg',
  },
  {
    name: 'Threading',
    slug: 'threading',
    description: 'Precise eyebrow shaping and facial threading',
    icon: '🪡',
    image: '/images/services/threading.jpg',
  },
  {
    name: 'Waxing',
    slug: 'waxing',
    description: 'Honey wax, Rica wax, and Brazilian wax services',
    icon: '🌿',
    image: '/images/services/waxing.jpg',
  },
  {
    name: 'Facial',
    slug: 'facial',
    description: 'From clean-ups to diamond facials — glow treatments for every skin type',
    icon: '🌸',
    image: '/images/services/facial.jpg',
  },
  {
    name: 'Mehendi',
    slug: 'mehendi',
    description: 'Beautiful bridal and occasion mehendi artistry',
    icon: '🤲',
    image: '/images/services/mehendi.jpg',
  },
  {
    name: 'Manicure & Pedicure',
    slug: 'manicure-pedicure',
    description: 'Classic to crystal nail care and hand/foot treatments',
    icon: '💅',
    image: '/images/services/manicure&pedicure.jpg',
  },
  {
    name: 'Bleach',
    slug: 'bleach',
    description: 'Oxy and lacto bleach for a naturally radiant complexion',
    icon: '☀️',
    image: '/images/services/blech.jpg',
  },
];

// ---- Beauty Journey Steps ----
export const BEAUTY_JOURNEY_STEPS = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Browse our services and find the perfect beauty experience tailored to your needs.',
  },
  {
    number: '02',
    title: 'CONSULT',
    description: 'Connect with our experts to discuss your vision and personalize your experience.',
  },
  {
    number: '03',
    title: 'PREPARE',
    description: 'Your artist prepares a customized plan using premium products and techniques.',
  },
  {
    number: '04',
    title: 'TRANSFORM',
    description: 'Experience the artistry as our skilled team brings your vision to life.',
  },
  {
    number: '05',
    title: 'CELEBRATE',
    description: 'Step out feeling confident, radiant, and ready for your special moment.',
  },
];

// ---- Bridal Timeline ----
export const BRIDAL_TIMELINE = [
  { number: '01', title: 'CONSULT', description: 'Share your bridal vision and preferences with our expert team.' },
  { number: '02', title: 'PREPARE', description: 'Pre-bridal skin and hair care regime tailored just for you.' },
  { number: '03', title: 'TRANSFORM', description: 'Expert bridal makeup, hair styling, and mehendi artistry.' },
  { number: '04', title: 'STYLE', description: 'Perfect saree draping, accessories, and finishing touches.' },
  { number: '05', title: 'CELEBRATE', description: 'Walk into your special day feeling like the most beautiful you.' },
];
