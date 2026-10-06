import React, { useState } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Artistry' },
    { id: 'bridal', label: 'Bridal Makeovers' },
    { id: 'mehendi', label: 'Mehendi' },
    { id: 'hair', label: 'Hair Styling' },
    { id: 'skin', label: 'Facial & Glow' },
  ];

  const galleryItems = [
    { id: 1, title: 'Traditional South Indian Muhurtham Glow', category: 'bridal', tag: 'Bridal' },
    { id: 2, title: 'Intricate Bridal Palm & Wrist Henna', category: 'mehendi', tag: 'Mehendi' },
    { id: 3, title: 'Reception Glam Makeup & Soft Curls', category: 'bridal', tag: 'Bridal' },
    { id: 4, title: 'Silk Keratin Straightening & Shine', category: 'hair', tag: 'Hair' },
    { id: 5, title: 'O3+ Illuminating Bridal Pre-Facial', category: 'skin', tag: 'Skin' },
    { id: 6, title: 'Arabic Floral Mehendi Pattern', category: 'mehendi', tag: 'Mehendi' },
    { id: 7, title: 'Classic Layer Cut & Blow Dry Styling', category: 'hair', tag: 'Hair' },
    { id: 8, title: 'Diamond Rejuvenating Skin Ritual', category: 'skin', tag: 'Skin' },
  ];

  const filtered = activeFilter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <div className="py-16 md:py-24 bg-[#191715] text-[#F8F3ED] min-h-screen">
      <div className="container-custom">
        <SectionHeading
          subtitle="Client Showcase"
          title="Transformations & Gallery"
          description="Explore our curated portfolio of bridal transformations, mehendi designs, and hair aesthetics."
          align="center"
          theme="dark"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#B8955A] text-[#191715] shadow-lg'
                  : 'bg-[#2A2623] text-[#EFE3D5] hover:bg-[#3A3633]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-[#2A2623] border border-[#B8955A]/20 hover:border-[#D4B87A]/60 aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              {/* Background Artistry Frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#191715] via-[#2A2623]/80 to-[#191715]/40 flex items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#B8955A]/10 border border-[#B8955A]/30 flex items-center justify-center text-[#D4B87A] mb-8">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              {/* Tag Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-black/60 text-[#D4B87A] px-3 py-1 rounded-full border border-[#B8955A]/30">
                  {item.tag}
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#D4B87A] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
