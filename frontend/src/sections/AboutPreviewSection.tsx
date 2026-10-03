import React, { useState } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Sparkles, ShieldCheck, HeartHandshake, ArrowRight, Eye } from 'lucide-react';

const STUDIO_HIGHLIGHTS = [
  {
    image: '/images/luxury_salon_sanctuary.jpg',
    title: 'Main Luxury Atelier & Vanity Suite',
    caption: 'Gold backlit arches, travertine marble & plush velvet stations',
  },
  {
    image: '/images/luxury_bridal_editorial.jpg',
    title: 'Private Bridal Couture Suite',
    caption: 'Dedicated royal sanctuary for brides, jewellery setting & saree pleating',
  },
  {
    image: '/images/luxury_skincare_facial.jpg',
    title: 'Skincare Rejuvenation Pod',
    caption: 'Tranquil ambiance, gold leaf peptide therapy & botanical hydra facials',
  },
];

export const AboutPreviewSection: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F8F3ED 0%, #F3EDE4 50%, #F8F3ED 100%)' }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(184,149,90,0.1) 0%, transparent 70%)'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Studio Interior Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Main showcase image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B8955A]/30 aspect-[4/5] bg-[#191715]">
              <img
                src={STUDIO_HIGHLIGHTS[activeImage].image}
                alt={STUDIO_HIGHLIGHTS[activeImage].title}
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* Gradient overlay at bottom */}
              <div
                className="absolute bottom-0 inset-x-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(25,23,21,0.9), rgba(25,23,21,0.4), transparent)' }}
              >
                <h3 className="font-serif text-lg text-[#F8F3ED] font-medium">
                  {STUDIO_HIGHLIGHTS[activeImage].title}
                </h3>
                <p className="text-xs text-[#E5D3BF]/75 font-light">
                  {STUDIO_HIGHLIGHTS[activeImage].caption}
                </p>
              </div>

              {/* Top badge */}
              <div
                className="absolute top-3 left-3 bg-[#191715]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B8955A]/40 text-white flex items-center gap-1.5 shadow-lg"
                style={{ fontSize: '11px' }}
              >
                <Eye className="w-3.5 h-3.5 text-[#D4B87A]" />
                <span className="font-medium">Inside Our Studio</span>
              </div>
            </div>

            {/* Thumbnail selector row */}
            <div className="flex items-center gap-2 mt-3 px-1">
              {STUDIO_HIGHLIGHTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-1 rounded-xl overflow-hidden border-2 transition-all aspect-[3/2] ${
                    activeImage === idx
                      ? 'border-[#B8955A] shadow-lg ring-2 ring-[#B8955A]/30'
                      : 'border-[#E5D3BF]/40 hover:border-[#B8955A]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Text & Values (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              subtitle="Our Heritage & Promise"
              title="A Safe, Private Space Dedicated Exclusively to You"
              align="left"
              className="mb-6 md:mb-6"
            />

            <p className="text-base text-[#2A2623]/80 font-light leading-relaxed">
              Located at Mahalakshmi Nagar, Main Road, Guduvanchery, Sara's Beauty & Bridal Studio was established with a singular vision: to offer a private, welcoming sanctuary where women and children receive premium salon and bridal services with unwavering attention to hygiene, comfort, and aesthetics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E5D3BF]">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#B8955A] font-semibold block">
                  Ladies & Kids Sanctuary
                </span>
                <p className="text-xs text-[#2A2623]/75 font-light leading-relaxed">
                  Complete seclusion, comfortable private rooms, and female stylists.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#B8955A] font-semibold block">
                  Certified Formulations
                </span>
                <p className="text-xs text-[#2A2623]/75 font-light leading-relaxed">
                  Genuine international products including O3+, Lotus, Rica, and herbal extracts.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                href="/about"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Read Our Complete Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
