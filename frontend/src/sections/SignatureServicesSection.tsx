import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SIGNATURE_CATEGORIES } from '@/data/constants';
import { SectionHeading } from '@/components/SectionHeading';
import { generateWhatsAppLink } from '@/utils/whatsapp';

// ---- Wide Horizontal Landscape Offer Banners (Enrich Style) ----
const LANDSCAPE_OFFERS = [
  {
    id: 'bridal-combo',
    tag: 'MOST POPULAR',
    tagBg: 'bg-[#B8955A]/25 text-[#D4B87A] border-[#B8955A]/40',
    title: 'Bridal Grand Makeover Special',
    price: '₹15,999',
    originalPrice: '₹22,000',
    discount: 'SAVE ₹6,000',
    inclusions: [
      'HD Waterproof Makeup & Hair Styling',
      'Muhurtham Saree Draping & Pleat Setting',
      'Bridal Mehendi (Both Hands & Feet)'
    ],
    image: '/images/services/Bridal.png',
    bgGradient: 'from-[#2A0E14] via-[#1E0B10] to-[#12070A]',
    borderColor: 'border-[#B8955A]/40 hover:border-[#D4B87A]',
  },
  {
    id: 'hair-combo',
    tag: 'FLAT 40% OFF',
    tagBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    title: 'Hair Transformation Combo',
    price: '₹1,499',
    originalPrice: '₹2,500',
    discount: '40% SAVINGS',
    inclusions: [
      'Precision Layer / Feather Haircut',
      'Nourishing Keratin Hair Spa',
      'Blow Dry Setting & Deep Scalp Massage'
    ],
    image: '/images/services/hair.jpg',
    bgGradient: 'from-[#1E1B18] via-[#191715] to-[#12100E]',
    borderColor: 'border-[#B8955A]/40 hover:border-[#D4B87A]',
  },
  {
    id: 'facial-glow',
    tag: 'FESTIVE SPECIAL',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    title: 'Diamond Radiance Glow Special',
    price: '₹2,499',
    originalPrice: '₹3,200',
    discount: 'SAVE ₹700',
    inclusions: [
      'O3+ Diamond Radiance Facial',
      'Herbal Anti-Tan Clean Up & Pack',
      'Oxy Glow Bleach & Eyebrow Shaping'
    ],
    image: '/images/services/facial.jpg',
    bgGradient: 'from-[#241B18] via-[#1D1614] to-[#140F0D]',
    borderColor: 'border-[#B8955A]/40 hover:border-[#D4B87A]',
  },
  {
    id: 'spa-retreat',
    tag: 'WEEKEND SPECIAL',
    tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    title: 'Complete Spa & Wellness Retreat',
    price: '₹2,999',
    originalPrice: '₹4,000',
    discount: 'BEST VALUE',
    inclusions: [
      'Full Body Aroma Relaxation Spa',
      'Ayurvedic Hot Oil Head Massage',
      'Crystal Spa Pedicure & Manicure'
    ],
    image: '/images/services/spa.jpg',
    bgGradient: 'from-[#0E1E1A] via-[#0A1613] to-[#070F0D]',
    borderColor: 'border-[#B8955A]/40 hover:border-[#D4B87A]',
  },
  {
    id: 'mehendi-draping',
    tag: 'WEDDING ESSENTIAL',
    tagBg: 'bg-[#B8955A]/25 text-[#D4B87A] border-[#B8955A]/40',
    title: 'Bridal Mehendi & Saree Pre-Pleating',
    price: '₹3,499',
    originalPrice: '₹4,500',
    discount: 'SAVE ₹1,000',
    inclusions: [
      'Elbow-Length Organic Dark Stain Henna',
      'Muhurtham Saree Box Folding & Pinning',
      'Save 2 Hours on Wedding Morning'
    ],
    image: '/images/services/mehendi.jpg',
    bgGradient: 'from-[#261510] via-[#1D100C] to-[#140B08]',
    borderColor: 'border-[#B8955A]/40 hover:border-[#D4B87A]',
  },
];

// Map of inside menu highlights for each category
const CATEGORY_ITEMS: Record<string, string[]> = {
  bridal: ['HD & Airbrush Look', 'Muhurtham Saree Draping', 'Jewellery Setting'],
  hair: ['Keratin Therapy', 'Hair Spa & Smoothening', 'Layer & Feather Cut'],
  skin: ['O3+ Brightening', 'Lotus De-Tan Care', 'Under-Eye & Dark Neck'],
  spa: ['Aroma Body Massage', 'Hot Oil Head Spa', 'Deep Foot Reflexology'],
  threading: ['Eyebrow Precision', 'Upper Lip & Forehead', 'Full Face Threading'],
  waxing: ['Rica Liposoluble Wax', 'Brazilian Wax', 'Full Body Waxing'],
  facial: ['Gold Radiance Facial', 'Diamond Glow Polish', 'Vitamin-C Skin Whitening'],
  mehendi: ['Arabic Bridal Mehendi', 'Traditional South Indian', 'Custom Figurines'],
  'manicure-pedicure': ['Crystal Spa Pedicure', 'Detox Hand Scrub', 'Gel Nail Polish'],
  bleach: ['Oxy Glow Bleach', 'Lacto Herbal Bleach', 'Radiance Neck Bleach'],
};

export const SignatureServicesSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 bg-[#F8F3ED] overflow-hidden">
      <div className="container-custom">
        
        {/* ============ 1. SERVICES HEADER & FULL-WIDTH GRID ============ */}
        <SectionHeading
          subtitle="Curated Offerings"
          title="Signature Services"
          description="Explore our specialized treatments crafted with high-grade products and master precision."
          align="center"
        />

        {/* 10 Services in a Clean, Full-Width Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 mb-10">
          {SIGNATURE_CATEGORIES.map((cat) => {
            const subItems = CATEGORY_ITEMS[cat.slug] || ['Specialized Care', 'Expert Styling', 'Genuine Brands'];

            return (
              <Link
                key={cat.slug}
                to={`/services/${cat.slug}`}
                onMouseEnter={() => setHoveredCard(cat.slug)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl overflow-hidden border border-[#E5D3BF] hover:border-[#B8955A] transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 bg-[#191715] flex flex-col justify-between"
                style={{ height: '210px' }}
              >
                {/* Background Image with Smooth Zoom */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115 group-hover:filter group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 group-hover:from-black/95 group-hover:via-black/85 group-hover:to-black/60 transition-all duration-500" />
                </div>

                {/* Top Badge: Icon & Category Indicator */}
                <div className="relative z-10 p-3.5 flex items-start justify-between">
                  <span className="inline-flex items-center justify-center w-10 h-10 text-xl bg-white/90 group-hover:bg-[#B8955A] group-hover:text-white backdrop-blur-md rounded-xl shadow-md transition-all duration-300 transform group-hover:rotate-6">
                    {cat.icon}
                  </span>

                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-[#D4B87A] border border-[#B8955A]/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore
                  </span>
                </div>

                {/* Bottom Info: Title & Sliding Inside Menus */}
                <div className="relative z-10 p-3.5 space-y-1">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-white group-hover:text-[#D4B87A] transition-colors leading-tight">
                    {cat.name}
                  </h3>

                  {/* Inside Menus / Services in text that appear on hover */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 space-y-1">
                    <div className="flex flex-wrap gap-1 pt-1">
                      {subItems.map((item, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#B8955A]/35 text-[#F5E6D3] border border-[#B8955A]/40 font-medium tracking-wide"
                        >
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Menu Action Link */}
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#E5D3BF]/90 group-hover:text-white pt-1 transition-colors">
                    <span>View Menu</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 text-[#D4B87A]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center mb-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#191715] hover:bg-[#B8955A] text-white text-xs font-semibold uppercase tracking-widest shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Complete 80+ Service Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* ============ 2. OFFERS & COMBOS (WIDE LANDSCAPE ENRICH-STYLE MOVING BANNERS) ============ */}
      <div className="pt-8 border-t border-[#E5D3BF]">
        
        {/* Section Header */}
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#886835] font-bold">
              <Tag className="w-3.5 h-3.5 text-[#B8955A]" />
              Exclusive Seasonal Deals
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#191715] font-normal mt-1">
              Promotional Offers & Special Combos
            </h3>
          </div>

          <span className="text-xs text-[#2A2623]/60 hidden sm:inline-block">
            Hover to pause • Click any banner to book directly via WhatsApp
          </span>
        </div>

        {/* Infinite Moving Wide Landscape Banners Ribbon (Right to Left Continuous) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F3ED] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F3ED] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-6 px-4 hover:[animation-play-state:paused]">
            
            {/* Loop 1: Wide Landscape Rectangular Banners */}
            {LANDSCAPE_OFFERS.map((offer) => (
              <a
                key={`landscape-1-${offer.id}`}
                href={generateWhatsAppLink(`Hello Sara's Beauty Studio! I would like to book the "${offer.title}" (${offer.price}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-[520px] sm:w-[580px] md:w-[620px] h-[260px] sm:h-[280px] shrink-0 rounded-3xl overflow-hidden border-2 ${offer.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group block bg-gradient-to-r ${offer.bgGradient} relative`}
                title={`Book ${offer.title}`}
              >
                <div className="h-full w-full flex items-stretch relative">
                  
                  {/* Left Side: Offer Info & Inclusions */}
                  <div className="w-[62%] sm:w-[64%] p-6 sm:p-7 flex flex-col justify-between z-10 text-white">
                    <div className="space-y-2">
                      
                      {/* Badge Row */}
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${offer.tagBg}`}>
                          <Sparkles className="w-3 h-3" />
                          {offer.tag}
                        </span>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          {offer.discount}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-serif text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-[#D4B87A] transition-colors">
                        {offer.title}
                      </h4>

                      {/* Inclusions List */}
                      <ul className="space-y-1 pt-1">
                        {offer.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#E5D3BF]/90 font-light truncate">
                            <CheckCircle2 className="w-3 h-3 text-[#D4B87A] shrink-0" />
                            <span className="truncate">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing & CTA Button */}
                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4B87A]">
                          {offer.price}
                        </span>
                        <span className="text-xs text-white/50 line-through">
                          {offer.originalPrice}
                        </span>
                      </div>

                      <span className="px-3.5 py-1.5 rounded-xl bg-[#B8955A] group-hover:bg-[#A8854A] text-[#191715] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Book Now
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Image with Seamless Fade */}
                  <div className="w-[38%] sm:w-[36%] relative overflow-hidden h-full">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                    />
                    {/* Left soft dark gradient blend */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#12070A] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                </div>
              </a>
            ))}

            {/* Loop 2: Seamless Repeat */}
            {LANDSCAPE_OFFERS.map((offer) => (
              <a
                key={`landscape-2-${offer.id}`}
                href={generateWhatsAppLink(`Hello Sara's Beauty Studio! I would like to book the "${offer.title}" (${offer.price}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-[520px] sm:w-[580px] md:w-[620px] h-[260px] sm:h-[280px] shrink-0 rounded-3xl overflow-hidden border-2 ${offer.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group block bg-gradient-to-r ${offer.bgGradient} relative`}
                title={`Book ${offer.title}`}
              >
                <div className="h-full w-full flex items-stretch relative">
                  
                  {/* Left Side: Offer Info & Inclusions */}
                  <div className="w-[62%] sm:w-[64%] p-6 sm:p-7 flex flex-col justify-between z-10 text-white">
                    <div className="space-y-2">
                      
                      {/* Badge Row */}
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${offer.tagBg}`}>
                          <Sparkles className="w-3 h-3" />
                          {offer.tag}
                        </span>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          {offer.discount}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-serif text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-[#D4B87A] transition-colors">
                        {offer.title}
                      </h4>

                      {/* Inclusions List */}
                      <ul className="space-y-1 pt-1">
                        {offer.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#E5D3BF]/90 font-light truncate">
                            <CheckCircle2 className="w-3 h-3 text-[#D4B87A] shrink-0" />
                            <span className="truncate">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing & CTA Button */}
                    <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4B87A]">
                          {offer.price}
                        </span>
                        <span className="text-xs text-white/50 line-through">
                          {offer.originalPrice}
                        </span>
                      </div>

                      <span className="px-3.5 py-1.5 rounded-xl bg-[#B8955A] group-hover:bg-[#A8854A] text-[#191715] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Book Now
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Image with Seamless Fade */}
                  <div className="w-[38%] sm:w-[36%] relative overflow-hidden h-full">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                    />
                    {/* Left soft dark gradient blend */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#12070A] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                </div>
              </a>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};
