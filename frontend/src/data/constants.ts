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

// ---- Experience Finder Options (Clean & Professional) ----
export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  {
    id: 'wedding',
    label: 'Bridal & Wedding',
    icon: '',
    recommendedServices: ['Bridal Mehendi', 'Bridal (O3+)', 'Bridal (Lotus)', 'Saree Draping', 'Saree Pre-Pleating & Box Folding'],
  },
  {
    id: 'engagement',
    label: 'Engagement Ceremony',
    icon: '',
    recommendedServices: ['Party Makeup', 'Hair Styling', 'Full Hand Mehendi', 'Blow Dry Setting'],
  },
  {
    id: 'reception',
    label: 'Reception & Sangeet',
    icon: '',
    recommendedServices: ['Party Glam', 'Blow Dry Setting', 'Ironing', 'Saree Draping'],
  },
  {
    id: 'party',
    label: 'Occasion & Party',
    icon: '',
    recommendedServices: ['Party Styling', 'Blow Dry Setting', 'Ironing', 'Clean Up'],
  },
  {
    id: 'selfcare',
    label: 'Restorative Self-Care',
    icon: '',
    recommendedServices: ['Diamond Facial', 'Coconut Oil Therapy', 'Hair Spa', 'Classic Manicure', 'Classic Pedicure'],
  },
  {
    id: 'hair',
    label: 'Hair Artistry & Care',
    icon: '',
    recommendedServices: ['Precision Layer Cut', 'Blow Dry Setting', 'Hair Coloring', 'Hair Spa'],
  },
  {
    id: 'skin',
    label: 'Aesthetic Skincare',
    icon: '',
    recommendedServices: ['Vitamin-C Infusion', 'Skin Brightening', 'Anti-Tan', 'Dark Neck Treatment', 'Under Eye Treatment'],
  },
  {
    id: 'relaxation',
    label: 'Head & Body Spa',
    icon: '',
    recommendedServices: ['Warm Herbal Oil', 'Olive Oil Scalp Therapy', 'Hair Spa', 'Crystal Pedicure', 'Crystal Manicure'],
  },
  {
    id: 'kids',
    label: 'Kids Haircut',
    icon: '',
    recommendedServices: ['Baby Cut', 'Mushroom Cut', 'Pop Cut'],
  },
];

// ---- Signature Service Categories for Homepage ----
export const SIGNATURE_CATEGORIES = [
  {
    name: 'Bridal Couture',
    slug: 'bridal',
    description: 'Complete royal bridal transformation with bespoke makeup, hair styling, and mehendi artistry',
    icon: '',
    image: '/images/luxury_bridal_editorial.jpg',
  },
  {
    name: 'Hair Artistry',
    slug: 'hair',
    description: 'Expert cuts, glossing, keratin treatments, and couture styling for every occasion',
    icon: '',
    image: '/images/luxury_hair_styling.jpg',
  },
  {
    name: 'Skin & Facial Therapy',
    slug: 'skin',
    description: 'Gold-infused hydra facials, peptide skin therapy, and deep botanical rejuvenating care',
    icon: '',
    image: '/images/luxury_skincare_facial.jpg',
  },
  {
    name: 'Spa & Wellness Sanctuary',
    slug: 'spa',
    description: 'Relaxing hot oil scalp therapies, herbal body polish, and tranquil self-care',
    icon: '',
    image: '/images/luxury_salon_sanctuary.jpg',
  },
  {
    name: 'Mehendi Artistry',
    slug: 'mehendi',
    description: 'Intricate peacock and floral jaal bridal henna with rich organic stain',
    icon: '',
    image: '/images/luxury_bridal_mehendi.jpg',
  },
  {
    name: 'Threading & Waxing',
    slug: 'threading',
    description: 'Precise eyebrow architecture and painless honey and Rica waxing',
    icon: '',
    image: '/images/services/waxing.jpg',
  },
  {
    name: 'Manicure & Pedicure',
    slug: 'manicure-pedicure',
    description: 'Classic to crystal nail rejuvenation and therapeutic foot rituals',
    icon: '',
    image: '/images/services/manicure&pedicure.jpg',
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
