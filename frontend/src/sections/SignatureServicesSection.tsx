import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SIGNATURE_CATEGORIES } from '@/data/constants';
import { SectionHeading } from '@/components/SectionHeading';
import { generateWhatsAppLink } from '@/utils/whatsapp';

const CURATED_SPECIALS = [
  {
    id: 'bridal-combo',
    title: 'Bridal Grand Makeover Suite',
    price: '₹15,999',
    originalPrice: '₹22,000',
    savings: 'Savings of ₹6,000',
    description: 'Complete HD waterproof makeup, hair styling, muhurtham saree pleating, and organic full hand & feet bridal mehendi.',
    image: '/images/luxury_bridal_editorial.jpg',
  },
  {
    id: 'hair-combo',
    title: 'Keratin & Hair Transformation',
    price: '₹1,499',
    originalPrice: '₹2,500',
    savings: '40% Savings',
    description: 'Precision feather cut, intensive keratin hair spa, deep scalp reflexology, and blow-dry finish.',
    image: '/images/luxury_hair_styling.jpg',
  },
  {
    id: 'facial-glow',
    title: 'Diamond Radiance Skin Therapy',
    price: '₹2,499',
    originalPrice: '₹3,200',
    savings: 'Savings of ₹700',
    description: 'O3+ diamond illumination facial, herbal anti-tan clean up, oxy radiance bleach, and eyebrow styling.',
    image: '/images/luxury_skincare_facial.jpg',
  },
  {
    id: 'spa-retreat',
    title: 'Aroma Sanctuary & Body Retreat',
    price: '₹2,999',
    originalPrice: '₹4,000',
    savings: 'Curated Value',
    description: 'Full-body restorative aroma massage, hot herbal oil head therapy, and crystal pedicure manicure.',
    image: '/images/luxury_salon_sanctuary.jpg',
  },
];

export const SignatureServicesSection: React.FC = () => {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(SIGNATURE_CATEGORIES[0].slug);

  const activeCategory =
    SIGNATURE_CATEGORIES.find((c) => c.slug === activeCategorySlug) || SIGNATURE_CATEGORIES[0];

  return (
    <section className="py-20 md:py-32 bg-[#F8F3ED] overflow-hidden border-b border-[#E5D3BF]">
      <div className="container-custom">
        {/* Section Header */}
        <SectionHeading
          subtitle="Curated Offerings"
          title="Signature Salon & Bridal Services"
          description="Explore our authentic service menu with transparent pricing, genuine international brands, and master precision."
          align="center"
        />

        {/* ============ Open Editorial Service Directory (No Boxes) ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start mt-12 mb-24">
          {/* Left: Sticky Atelier Photography Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#191715] shadow-xl">
              <img
                src={activeCategory.image}
                alt={activeCategory.name}
                className="w-full h-full object-cover transition-all duration-700 brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4B87A] font-medium block">
                  Atelier Focus
                </span>
                <h4 className="text-xl sm:text-2xl font-normal text-white">
                  {activeCategory.name}
                </h4>
                <p className="text-xs text-[#E5D3BF]/75 font-light leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Typographic List of Services with Hairline Dividers */}
          <div className="lg:col-span-7 divide-y divide-[#E5D3BF]">
            {SIGNATURE_CATEGORIES.map((cat, idx) => {
              const isActive = cat.slug === activeCategorySlug;
              return (
                <div
                  key={cat.slug}
                  onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                  className={`py-5 transition-all duration-300 ${
                    isActive ? 'pl-4 border-l-2 border-[#B8955A]' : 'hover:pl-2'
                  }`}
                >
                  <Link
                    to={`/services/${cat.slug}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#B8955A] font-medium">
                          0{idx + 1}
                        </span>
                        <h3 className="text-lg sm:text-xl font-normal text-[#191715] group-hover:text-[#886835] transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#2A2623]/70 font-light max-w-md leading-relaxed pl-7">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#B8955A] group-hover:text-[#886835] transition-colors pl-7 sm:pl-0 shrink-0">
                      <span>View Menu</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All Services Link */}
        <div className="text-center mb-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#191715] hover:text-[#B8955A] transition-colors group"
          >
            <span>Explore Complete 100+ Treatment Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#B8955A]" />
          </Link>
        </div>

        {/* ============ Open Editorial Specials (No Boxes) ============ */}
        <div className="pt-12 border-t border-[#E5D3BF]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8955A] font-semibold block mb-2">
                Seasonal Artistry
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#191715] tracking-tight">
                Curated Combination Specials
              </h3>
            </div>
            <p className="text-xs text-[#2A2623]/60 font-light max-w-sm">
              Pre-packaged transformations for wedding celebrations, festive events, and complete restorative sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {CURATED_SPECIALS.map((special) => (
              <div
                key={special.id}
                className="flex flex-col sm:flex-row gap-6 items-start pb-8 border-b border-[#E5D3BF]/70 group"
              >
                <div className="w-full sm:w-44 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-[#191715]">
                  <img
                    src={special.image}
                    alt={special.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8955A] font-semibold">
                      {special.savings}
                    </span>
                    <span className="text-xs line-through text-[#2A2623]/40">
                      {special.originalPrice}
                    </span>
                  </div>

                  <h4 className="text-lg font-normal text-[#191715] group-hover:text-[#886835] transition-colors">
                    {special.title}
                  </h4>

                  <p className="text-xs text-[#2A2623]/70 font-light leading-relaxed">
                    {special.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-medium text-[#191715]">
                      {special.price}
                    </span>

                    <a
                      href={generateWhatsAppLink(`Hello Sara's Beauty Studio, I would like to book the ${special.title} (${special.price}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#1D8A6E] hover:text-[#176B57] font-medium tracking-wide"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Book</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
