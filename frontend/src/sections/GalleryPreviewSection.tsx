import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/SectionHeading';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/Button';

export const GalleryPreviewSection: React.FC = () => {
  const galleryItems = [
    { title: 'Royal Muhurtham Bridal Glow', category: 'Bridal Makeover', tag: 'Bridal' },
    { title: 'Intricate Floral Bridal Mehendi', category: 'Mehendi Artistry', tag: 'Mehendi' },
    { title: 'Silk Keratin & Layered Haircut', category: 'Hair Artistry', tag: 'Hair' },
    { title: 'O3+ Diamond Illuminating Facial', category: 'Skin Aesthetics', tag: 'Facial' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#191715] text-[#F8F3ED]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            subtitle="Visual Portfolio"
            title="Transformations & Artistry"
            description="A glimpse of our bridal makeovers, signature hairstyles, and glowing transformations."
            align="left"
            theme="dark"
            className="mb-0 md:mb-0"
          />

          <Button
            href="/gallery"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-auto shrink-0"
          >
            View Full Gallery
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <Link
              key={idx}
              to="/gallery"
              className="group relative rounded-2xl overflow-hidden bg-[#2A2623] border border-[#B8955A]/20 hover:border-[#B8955A]/60 aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Artistic Fallback Visual Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#191715] via-[#2A2623]/80 to-[#191715]/40 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#B8955A]/10 border border-[#B8955A]/30 flex items-center justify-center text-[#D4B87A] mb-8">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              {/* Demo Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[10px] uppercase tracking-widest bg-black/60 text-[#D4B87A] px-2.5 py-1 rounded-full border border-[#B8955A]/30 backdrop-blur-xs">
                  {item.tag}
                </span>
              </div>

              {/* Overlay Content */}
              <div className="relative z-10 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#D4B87A] font-semibold">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#D4B87A] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
