// ============================================
// Sara's Beauty & Bridal Studio — Complete Service Data
// ALL prices are real, from the salon's actual menu.
// DO NOT modify prices without owner's confirmation.
// ============================================

import type { Service, ServiceCategory } from '@/types';

// ---- Service Categories ----
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'cat-threading', name: 'Threading', slug: 'threading', description: 'Precise eyebrow shaping and facial threading for a clean, defined look.', image_url: '', page_slug: 'threading', display_order: 1, is_active: true },
  { id: 'cat-honey-wax', name: 'Honey Wax', slug: 'honey-wax', description: 'Smooth, effective hair removal using natural honey-based wax.', image_url: '', page_slug: 'waxing', display_order: 2, is_active: true },
  { id: 'cat-rica-wax', name: 'Rica Wax', slug: 'rica-wax', description: 'Premium Rica wax for sensitive skin — gentle and long-lasting.', image_url: '', page_slug: 'waxing', display_order: 3, is_active: true },
  { id: 'cat-brazilian-wax', name: 'Brazilian Wax', slug: 'brazilian-wax', description: 'Professional Brazilian waxing for ultra-smooth results.', image_url: '', page_slug: 'waxing', display_order: 4, is_active: true },
  { id: 'cat-bleach', name: 'Bleach', slug: 'bleach', description: 'Oxy and lacto bleach treatments for a naturally radiant complexion.', image_url: '', page_slug: 'bleach', display_order: 5, is_active: true },
  { id: 'cat-delan', name: 'Delan', slug: 'delan', description: 'Delan treatments for face, arms, and legs.', image_url: '', page_slug: 'skin', display_order: 6, is_active: true },
  { id: 'cat-manicure', name: 'Manicure', slug: 'manicure', description: 'Classic to crystal manicure — pamper your hands.', image_url: '', page_slug: 'manicure-pedicure', display_order: 7, is_active: true },
  { id: 'cat-pedicure', name: 'Pedicure', slug: 'pedicure', description: 'Complete foot care from classic to hydrating pedicure.', image_url: '', page_slug: 'manicure-pedicure', display_order: 8, is_active: true },
  { id: 'cat-addon', name: 'Add-on Packs', slug: 'add-on-packs', description: 'Enhance your experience with our premium peel-off mask add-ons.', image_url: '', page_slug: 'facial', display_order: 9, is_active: true },
  { id: 'cat-facial', name: 'Facial', slug: 'facial', description: 'From clean-ups to premium diamond facials — glow treatments for every skin type.', image_url: '', page_slug: 'facial', display_order: 10, is_active: true },
  { id: 'cat-skin', name: 'Skin Treatment', slug: 'skin-treatment', description: 'Targeted treatments for dark neck and under-eye concerns.', image_url: '', page_slug: 'skin', display_order: 11, is_active: true },
  { id: 'cat-massage', name: 'Hot Oil Massage', slug: 'hot-oil-massage', description: 'Relaxing hot oil scalp massages with premium oils.', image_url: '', page_slug: 'hair', display_order: 12, is_active: true },
  { id: 'cat-haircut', name: 'Hair Cut', slug: 'hair-cut', description: 'Expert hair cutting — from trims to layered and feather cuts.', image_url: '', page_slug: 'hair', display_order: 13, is_active: true },
  { id: 'cat-kidscut', name: 'Kids Cut', slug: 'kids-cut', description: 'Adorable haircuts designed specially for children.', image_url: '', page_slug: 'hair', display_order: 14, is_active: true },
  { id: 'cat-hairstyles', name: 'Hair Styles', slug: 'hair-styles', description: 'Blow dry, ironing, tongs, straightening, smoothening, and keratin.', image_url: '', page_slug: 'hair', display_order: 15, is_active: true },
  { id: 'cat-hairtreat', name: 'Hair Treatment', slug: 'hair-treatment', description: 'Hair spa, dandruff treatment, and professional hair care.', image_url: '', page_slug: 'hair', display_order: 16, is_active: true },
  { id: 'cat-haircolor', name: 'Hair Coloring', slug: 'hair-coloring', description: 'Hair dye, henna, streaks, root touch-up, and full coloring.', image_url: '', page_slug: 'hair', display_order: 17, is_active: true },
  { id: 'cat-mehendi', name: 'Mehendi', slug: 'mehendi', description: 'Beautiful bridal, Arabic, and occasion mehendi artistry.', image_url: '', page_slug: 'mehendi', display_order: 18, is_active: true },
  { id: 'cat-other', name: 'Other', slug: 'other', description: 'Saree draping, pre-pleating and other services.', image_url: '', page_slug: 'bridal', display_order: 19, is_active: true },
];

// ---- Helper ----
let serviceCounter = 0;
const svc = (
  category_id: string,
  name: string,
  price: number,
  price_type: 'FIXED' | 'STARTS_FROM',
  duration: string = '30 mins',
  is_featured: boolean = false
): Service => {
  serviceCounter++;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: `svc-${serviceCounter.toString().padStart(3, '0')}`,
    category_id,
    name,
    slug,
    description: '',
    price,
    price_type,
    duration,
    image_url: '',
    is_featured,
    is_active: true,
    display_order: serviceCounter,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// ---- ALL SERVICES — Real Prices ----
export const ALL_SERVICES: Service[] = [
  // THREADING
  svc('cat-threading', 'Eyebrows', 50, 'FIXED', '10 mins'),
  svc('cat-threading', 'Upper Lip', 30, 'FIXED', '5 mins'),
  svc('cat-threading', 'Chin', 30, 'FIXED', '5 mins'),
  svc('cat-threading', 'Side Locks', 40, 'FIXED', '10 mins'),
  svc('cat-threading', 'Full Face', 120, 'FIXED', '20 mins'),

  // HONEY WAX
  svc('cat-honey-wax', 'Chin', 50, 'FIXED', '10 mins'),
  svc('cat-honey-wax', 'Upper Lip', 50, 'FIXED', '10 mins'),
  svc('cat-honey-wax', 'Full Face', 150, 'FIXED', '20 mins'),
  svc('cat-honey-wax', 'Under Arms', 100, 'FIXED', '15 mins'),
  svc('cat-honey-wax', 'Full Hand', 300, 'FIXED', '30 mins'),
  svc('cat-honey-wax', 'Half Hand', 250, 'FIXED', '20 mins'),
  svc('cat-honey-wax', 'Full Leg', 400, 'FIXED', '40 mins'),
  svc('cat-honey-wax', 'Half Leg', 300, 'FIXED', '25 mins'),

  // RICA WAX
  svc('cat-rica-wax', 'Chin', 80, 'FIXED', '10 mins'),
  svc('cat-rica-wax', 'Upper Lip', 80, 'FIXED', '10 mins'),
  svc('cat-rica-wax', 'Full Face', 200, 'FIXED', '20 mins'),
  svc('cat-rica-wax', 'Under Arms', 150, 'FIXED', '15 mins'),
  svc('cat-rica-wax', 'Full Hand', 400, 'FIXED', '30 mins'),
  svc('cat-rica-wax', 'Half Hand', 350, 'FIXED', '20 mins'),
  svc('cat-rica-wax', 'Full Leg', 500, 'FIXED', '40 mins'),
  svc('cat-rica-wax', 'Half Leg', 400, 'FIXED', '25 mins'),

  // BRAZILIAN WAX
  svc('cat-brazilian-wax', 'Chin', 120, 'FIXED', '10 mins'),
  svc('cat-brazilian-wax', 'Upper Lip', 120, 'FIXED', '10 mins'),
  svc('cat-brazilian-wax', 'Full Face', 250, 'FIXED', '20 mins'),
  svc('cat-brazilian-wax', 'Under Arms', 300, 'FIXED', '15 mins'),

  // BLEACH
  svc('cat-bleach', 'Oxy Bleach', 350, 'FIXED', '30 mins'),
  svc('cat-bleach', 'Lacto Bleach', 300, 'FIXED', '30 mins'),

  // DELAN
  svc('cat-delan', 'Face & Back', 500, 'FIXED', '45 mins'),
  svc('cat-delan', 'Full Arms', 400, 'FIXED', '30 mins'),
  svc('cat-delan', 'Half Arms', 200, 'FIXED', '20 mins'),
  svc('cat-delan', 'Full Legs', 450, 'FIXED', '40 mins'),
  svc('cat-delan', 'Half Legs', 250, 'FIXED', '25 mins'),

  // MANICURE
  svc('cat-manicure', 'Classic Manicure', 500, 'FIXED', '30 mins'),
  svc('cat-manicure', 'Crystal Manicure', 800, 'FIXED', '45 mins', true),

  // PEDICURE
  svc('cat-pedicure', 'Classic Pedicure', 600, 'FIXED', '30 mins'),
  svc('cat-pedicure', 'Crystal Pedicure', 900, 'FIXED', '45 mins'),
  svc('cat-pedicure', 'Hydrating Pedicure', 1200, 'FIXED', '50 mins', true),
  svc('cat-pedicure', 'Heel Peel Treatment', 2000, 'FIXED', '60 mins'),

  // ADD-ON PACKS
  svc('cat-addon', 'Glow Peel Off Mask', 300, 'FIXED', '20 mins'),
  svc('cat-addon', 'Skin Tight Peel Off Mask', 400, 'FIXED', '20 mins'),
  svc('cat-addon', 'Gold Peel Off Mask', 450, 'FIXED', '20 mins'),

  // FACIAL
  svc('cat-facial', 'Clean Up', 350, 'FIXED', '30 mins'),
  svc('cat-facial', 'Fruit', 500, 'FIXED', '45 mins'),
  svc('cat-facial', 'Adv. Fruit', 700, 'FIXED', '50 mins'),
  svc('cat-facial', 'Charcoal', 800, 'FIXED', '50 mins'),
  svc('cat-facial', 'Pigmentation', 850, 'FIXED', '50 mins'),
  svc('cat-facial', 'Red Wine', 900, 'FIXED', '50 mins'),
  svc('cat-facial', 'Anti-Ageing', 900, 'FIXED', '55 mins'),
  svc('cat-facial', 'Anti-Tan', 1100, 'FIXED', '55 mins'),
  svc('cat-facial', 'Vitamin-C', 1300, 'FIXED', '60 mins', true),
  svc('cat-facial', 'Pearl', 1500, 'FIXED', '60 mins'),
  svc('cat-facial', 'Gold', 1600, 'FIXED', '60 mins', true),
  svc('cat-facial', 'Diamond', 1700, 'FIXED', '60 mins', true),
  svc('cat-facial', 'Skin Lightening', 1200, 'FIXED', '55 mins'),
  svc('cat-facial', 'Skin Brightening', 1500, 'FIXED', '60 mins'),
  svc('cat-facial', 'Skin Glow', 2000, 'FIXED', '60 mins'),
  svc('cat-facial', 'Shine & Glow', 2000, 'FIXED', '60 mins'),
  svc('cat-facial', 'Acne', 2000, 'FIXED', '60 mins'),
  svc('cat-facial', 'Party', 1600, 'FIXED', '60 mins'),
  svc('cat-facial', 'Bridal (Lotus)', 2000, 'FIXED', '75 mins', true),
  svc('cat-facial', 'Bridal (O3+)', 3000, 'FIXED', '90 mins', true),

  // SKIN TREATMENT
  svc('cat-skin', 'Dark Neck Treatment', 500, 'FIXED', '30 mins'),
  svc('cat-skin', 'Under Eye Treatment', 500, 'FIXED', '30 mins'),

  // HOT OIL MASSAGE
  svc('cat-massage', 'Coconut Oil', 500, 'FIXED', '30 mins'),
  svc('cat-massage', 'Olive Oil', 600, 'FIXED', '30 mins'),
  svc('cat-massage', 'Almond Oil', 550, 'FIXED', '30 mins'),
  svc('cat-massage', 'Herbal Oil', 650, 'FIXED', '30 mins'),

  // HAIR CUT
  svc('cat-haircut', 'Trimming', 150, 'FIXED', '15 mins'),
  svc('cat-haircut', 'Straight Cut', 300, 'FIXED', '20 mins'),
  svc('cat-haircut', "'U' Cut", 350, 'FIXED', '25 mins'),
  svc('cat-haircut', "Deep 'U' Cut", 400, 'FIXED', '25 mins'),
  svc('cat-haircut', 'Step Cut', 800, 'FIXED', '40 mins'),
  svc('cat-haircut', 'Layer Cut', 1000, 'FIXED', '45 mins', true),
  svc('cat-haircut', 'Feather Cut', 900, 'FIXED', '40 mins'),
  svc('cat-haircut', 'Front Bangs / Fringes', 250, 'FIXED', '15 mins'),

  // KIDS CUT
  svc('cat-kidscut', 'Baby Cut', 200, 'FIXED', '15 mins'),
  svc('cat-kidscut', 'Mushroom Cut', 300, 'FIXED', '20 mins'),
  svc('cat-kidscut', 'Pop Cut', 350, 'FIXED', '20 mins'),

  // HAIR STYLES
  svc('cat-hairstyles', 'Blow Dry Setting', 550, 'FIXED', '30 mins'),
  svc('cat-hairstyles', 'Ironing', 600, 'FIXED', '30 mins'),
  svc('cat-hairstyles', 'Tongs', 600, 'FIXED', '30 mins'),
  svc('cat-hairstyles', 'Hair Straightening', 3999, 'STARTS_FROM', '120 mins', true),
  svc('cat-hairstyles', 'Hair Smoothening', 3999, 'STARTS_FROM', '120 mins', true),
  svc('cat-hairstyles', 'Keratin', 4999, 'STARTS_FROM', '150 mins', true),

  // HAIR TREATMENT
  svc('cat-hairtreat', 'Hair Spa', 900, 'STARTS_FROM', '45 mins', true),
  svc('cat-hairtreat', 'Hair Spa (Dandruff)', 1200, 'FIXED', '50 mins'),
  svc('cat-hairtreat', 'Hair Spa (Hair Fall)', 1200, 'FIXED', '50 mins'),
  svc('cat-hairtreat', 'Dandruff Treatment (Machine)', 1100, 'FIXED', '45 mins'),
  svc('cat-hairtreat', 'Hair Wash (Shampoo)', 200, 'FIXED', '15 mins'),
  svc('cat-hairtreat', 'Hair Wash (Shampoo + Cond.)', 250, 'FIXED', '15 mins'),

  // HAIR COLORING
  svc('cat-haircolor', 'Hair Dye', 500, 'FIXED', '45 mins'),
  svc('cat-haircolor', 'Henna', 800, 'STARTS_FROM', '60 mins'),
  svc('cat-haircolor', 'Root Touch Up', 1000, 'STARTS_FROM', '45 mins'),
  svc('cat-haircolor', 'Hair Streaks (Per Streak)', 200, 'FIXED', '30 mins'),
  svc('cat-haircolor', 'Hair Coloring', 1800, 'STARTS_FROM', '90 mins', true),
  svc('cat-haircolor', 'Pre Lighting', 500, 'FIXED', '45 mins'),

  // MEHENDI
  svc('cat-mehendi', 'Bridal Mehendi', 3000, 'FIXED', '120 mins', true),
  svc('cat-mehendi', 'Full Hand Mehendi', 2000, 'FIXED', '90 mins'),
  svc('cat-mehendi', 'Half Hand Mehendi', 1500, 'FIXED', '60 mins'),
  svc('cat-mehendi', 'Leg Mehendi', 1000, 'STARTS_FROM', '60 mins'),
  svc('cat-mehendi', 'Arabic Style Mehendi', 1500, 'FIXED', '60 mins'),

  // OTHER
  svc('cat-other', 'Saree Draping', 300, 'FIXED', '20 mins'),
  svc('cat-other', 'Saree Pre-Pleating & Box Folding', 500, 'FIXED', '30 mins'),
];

// ---- Helper: Get services by category ----
export const getServicesByCategory = (categoryId: string): Service[] =>
  ALL_SERVICES.filter((s) => s.category_id === categoryId && s.is_active);

// ---- Helper: Get featured services ----
export const getFeaturedServices = (): Service[] =>
  ALL_SERVICES.filter((s) => s.is_featured && s.is_active);

// ---- Helper: Get category by slug ----
export const getCategoryBySlug = (slug: string): ServiceCategory | undefined =>
  SERVICE_CATEGORIES.find((c) => c.slug === slug);

// ---- Helper: Get services by page slug ----
export const getServicesByPageSlug = (pageSlug: string): Service[] => {
  const categoryIds = SERVICE_CATEGORIES
    .filter((c) => c.page_slug === pageSlug && c.is_active)
    .map((c) => c.id);
  return ALL_SERVICES.filter((s) => categoryIds.includes(s.category_id) && s.is_active);
};

// ---- Helper: Search services ----
export const searchServices = (query: string): Service[] => {
  const lower = query.toLowerCase();
  return ALL_SERVICES.filter(
    (s) =>
      s.is_active &&
      (s.name.toLowerCase().includes(lower) ||
        s.slug.includes(lower) ||
        SERVICE_CATEGORIES.find((c) => c.id === s.category_id)?.name.toLowerCase().includes(lower))
  );
};

export const SERVICES_DATA = ALL_SERVICES;

