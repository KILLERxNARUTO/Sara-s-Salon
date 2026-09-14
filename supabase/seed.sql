-- ============================================
-- SARA'S BEAUTY & BRIDAL STUDIO — SEED DATA
-- All prices are REAL from the salon's actual menu
-- ============================================

-- ---- SERVICE CATEGORIES ----
INSERT INTO service_categories (id, name, slug, description, page_slug, display_order) VALUES
  ('11111111-0001-0001-0001-000000000001', 'Threading', 'threading', 'Precise eyebrow shaping and facial threading', 'threading', 1),
  ('11111111-0001-0001-0001-000000000002', 'Honey Wax', 'honey-wax', 'Smooth hair removal using natural honey-based wax', 'waxing', 2),
  ('11111111-0001-0001-0001-000000000003', 'Rica Wax', 'rica-wax', 'Premium Rica wax for sensitive skin', 'waxing', 3),
  ('11111111-0001-0001-0001-000000000004', 'Brazilian Wax', 'brazilian-wax', 'Professional Brazilian waxing', 'waxing', 4),
  ('11111111-0001-0001-0001-000000000005', 'Bleach', 'bleach', 'Oxy and lacto bleach treatments', 'bleach', 5),
  ('11111111-0001-0001-0001-000000000006', 'Delan', 'delan', 'Delan treatments for face, arms, and legs', 'skin', 6),
  ('11111111-0001-0001-0001-000000000007', 'Manicure', 'manicure', 'Classic to crystal manicure', 'manicure-pedicure', 7),
  ('11111111-0001-0001-0001-000000000008', 'Pedicure', 'pedicure', 'Complete foot care', 'manicure-pedicure', 8),
  ('11111111-0001-0001-0001-000000000009', 'Add-on Packs', 'add-on-packs', 'Premium peel-off mask add-ons', 'facial', 9),
  ('11111111-0001-0001-0001-000000000010', 'Facial', 'facial', 'Clean-ups to premium diamond facials', 'facial', 10),
  ('11111111-0001-0001-0001-000000000011', 'Skin Treatment', 'skin-treatment', 'Dark neck and under-eye treatments', 'skin', 11),
  ('11111111-0001-0001-0001-000000000012', 'Hot Oil Massage', 'hot-oil-massage', 'Relaxing hot oil scalp massages', 'hair', 12),
  ('11111111-0001-0001-0001-000000000013', 'Hair Cut', 'hair-cut', 'Expert hair cutting', 'hair', 13),
  ('11111111-0001-0001-0001-000000000014', 'Kids Cut', 'kids-cut', 'Children haircuts', 'hair', 14),
  ('11111111-0001-0001-0001-000000000015', 'Hair Styles', 'hair-styles', 'Blow dry, ironing, tongs, straightening', 'hair', 15),
  ('11111111-0001-0001-0001-000000000016', 'Hair Treatment', 'hair-treatment', 'Hair spa, dandruff treatment', 'hair', 16),
  ('11111111-0001-0001-0001-000000000017', 'Hair Coloring', 'hair-coloring', 'Hair dye, henna, streaks', 'hair', 17),
  ('11111111-0001-0001-0001-000000000018', 'Mehendi', 'mehendi', 'Bridal, Arabic, and occasion mehendi', 'mehendi', 18),
  ('11111111-0001-0001-0001-000000000019', 'Other', 'other', 'Saree draping, pre-pleating', 'bridal', 19);

-- ---- SERVICES (Threading) ----
INSERT INTO services (category_id, name, slug, price, price_type, duration, display_order) VALUES
  ('11111111-0001-0001-0001-000000000001', 'Eyebrows', 'eyebrows', 50, 'FIXED', '10 mins', 1),
  ('11111111-0001-0001-0001-000000000001', 'Upper Lip', 'upper-lip', 30, 'FIXED', '5 mins', 2),
  ('11111111-0001-0001-0001-000000000001', 'Chin', 'chin-threading', 30, 'FIXED', '5 mins', 3),
  ('11111111-0001-0001-0001-000000000001', 'Side Locks', 'side-locks', 40, 'FIXED', '10 mins', 4),
  ('11111111-0001-0001-0001-000000000001', 'Full Face', 'full-face-threading', 120, 'FIXED', '20 mins', 5);

-- ---- SERVICES (Honey Wax) ----
INSERT INTO services (category_id, name, slug, price, price_type, duration, display_order) VALUES
  ('11111111-0001-0001-0001-000000000002', 'Chin', 'chin-honey-wax', 50, 'FIXED', '10 mins', 6),
  ('11111111-0001-0001-0001-000000000002', 'Upper Lip', 'upper-lip-honey-wax', 50, 'FIXED', '10 mins', 7),
  ('11111111-0001-0001-0001-000000000002', 'Full Face', 'full-face-honey-wax', 150, 'FIXED', '20 mins', 8),
  ('11111111-0001-0001-0001-000000000002', 'Under Arms', 'under-arms-honey', 100, 'FIXED', '15 mins', 9),
  ('11111111-0001-0001-0001-000000000002', 'Full Arms', 'full-arms-honey', 200, 'FIXED', '30 mins', 10),
  ('11111111-0001-0001-0001-000000000002', 'Half Legs', 'half-legs-honey', 200, 'FIXED', '30 mins', 11),
  ('11111111-0001-0001-0001-000000000002', 'Full Legs', 'full-legs-honey', 350, 'FIXED', '45 mins', 12),
  ('11111111-0001-0001-0001-000000000002', 'Stomach', 'stomach-honey', 250, 'FIXED', '30 mins', 13),
  ('11111111-0001-0001-0001-000000000002', 'Back', 'back-honey', 350, 'FIXED', '30 mins', 14),
  ('11111111-0001-0001-0001-000000000002', 'Full Body', 'full-body-honey', 1200, 'FIXED', '90 mins', 15);

-- ---- ARTISTS ----
INSERT INTO artists (name, role, bio, specialties, experience, display_order) VALUES
  ('Sara K.', 'Founder & Chief Bridal Artist', 'Dedicated to perfecting bridal transformations with decade-long expertise in South Indian and contemporary bridal artistry.', ARRAY['Bridal Makeovers', 'Saree Draping', 'Skin Aesthetics'], '10+ Years', 1),
  ('Priya R.', 'Senior Hair & Mehendi Stylist', 'Passionate about intricate mehendi design and modern hair trends tailored for every occasion.', ARRAY['Bridal Mehendi', 'Hair Styling', 'Arabic Henna'], '7+ Years', 2),
  ('Deepa M.', 'Skin & Aesthetic Specialist', 'Expert in facial rejuvenation with focus on O3+ professional grade skincare treatments.', ARRAY['O3+ Facials', 'Skin Brightening', 'Anti-Tan'], '6+ Years', 3);

-- ---- TESTIMONIALS ----
INSERT INTO testimonials (customer_name, rating, review, service, review_date, is_featured) VALUES
  ('Ananya S.', 5, 'Sara did my bridal makeover for both Muhurtham and Reception. The makeup stayed fresh through the entire 12 hours without a single crease. Everyone praised the natural glow and saree draping!', 'Muhurtham Bridal Makeover', '2024-12-15', TRUE),
  ('Kavitha R.', 5, 'The most relaxing and private salon in Guduvanchery! Dedicated ladies-only environment, exceptionally clean tools, and genuine brand products. My skin felt glowing immediately.', 'O3+ Facial & Hair Spa', '2025-01-20', TRUE),
  ('Deepika V.', 5, 'Intricate mehendi design and the saree pre-pleating saved us so much precious time on wedding morning. Super professional, courteous, and highly recommended!', 'Bridal Mehendi & Pre-Pleating', '2025-02-10', TRUE),
  ('Meera L.', 5, 'Best hair spa treatment I have ever had. My hair felt like silk for weeks. The hot oil massage was so relaxing. Already booked my next session!', 'Hair Spa & Hot Oil Massage', '2025-03-05', FALSE),
  ('Preethi K.', 5, 'Took my daughter for her first haircut here. The team was so gentle and patient with her. She loves her new mushroom cut! Thank you Sara''s team!', 'Kids Mushroom Cut', '2025-04-12', FALSE);

-- ---- SITE SETTINGS ----
INSERT INTO site_settings (key, value) VALUES
  ('business_name', 'Sara''s Beauty & Bridal Studio'),
  ('brand_name', 'Sara''s Makeover Artistry'),
  ('tagline', 'Beauty And Bridal Studio'),
  ('primary_phone', '9790690628'),
  ('secondary_phone', '9940099380'),
  ('landline', '044-48555426'),
  ('whatsapp_number', '919790690628'),
  ('email', 'Sarasbeautyandbridalstudio@gmail.com'),
  ('instagram_handle', '@saras_beauty_and_bridal_studio'),
  ('instagram_url', 'https://www.instagram.com/saras_beauty_and_bridal_studio/'),
  ('address_line_1', 'No:77, Mahalakshmi Nagar'),
  ('address_line_2', 'Main Road'),
  ('city', 'Guduvanchery - 603 202'),
  ('pincode', '603202'),
  ('landmark', 'Near NPR Mandapam'),
  ('google_maps_url', 'https://maps.app.goo.gl/Kfnfiuj1XD1TVM6H7');

-- ---- PACKAGES ----
INSERT INTO packages (name, slug, description, price, price_type, tier, display_order) VALUES
  ('Signature Bridal', 'signature-bridal', 'Essential bridal glow package for pre-wedding ceremonies and intimate celebrations.', NULL, 'CONTACT', 'SIGNATURE', 1),
  ('Luxe Royal Bridal', 'luxe-royal-bridal', 'Our most sought-after full-day wedding transformation experience.', NULL, 'CONTACT', 'LUXE', 2),
  ('Imperial Heritage Bridal', 'imperial-heritage-bridal', 'Comprehensive multi-event bridal luxury with dedicated master artist.', NULL, 'CONTACT', 'ROYAL', 3);
