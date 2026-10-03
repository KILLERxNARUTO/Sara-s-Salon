import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Instagram } from '@/components/icons/Instagram';
import { BUSINESS_INFO } from '@/data/constants';
import { Button } from '@/components/Button';

export const InstagramSection: React.FC = () => {
  const visuals = [
    {
      image: '/images/luxury_bridal_editorial.jpg',
      label: 'Haute Bridal Couture',
      tag: '#BridalTransformation'
    },
    {
      image: '/images/luxury_skincare_facial.jpg',
      label: 'Gold Hydra-Facial Therapy',
      tag: '#AestheticSkincare'
    },
    {
      image: '/images/luxury_hair_styling.jpg',
      label: 'Precision Waves & Keratin',
      tag: '#HairArtistry'
    },
    {
      image: '/images/luxury_bridal_mehendi.jpg',
      label: 'Intricate Royal Henna Art',
      tag: '#BridalMehendi'
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#141210] text-[#F8F3ED] border-t border-[#2A2623]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase font-medium tracking-[0.25em] text-[#D4B87A] flex items-center justify-center md:justify-start gap-2">
              <Instagram className="w-3.5 h-3.5 text-[#D4B87A]" />
              <span>Studio Visual Journal</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-normal text-white tracking-tight">
              {BUSINESS_INFO.instagram_handle}
            </h2>
          </div>

          <Button
            href={BUSINESS_INFO.instagram_url}
            isExternal
            variant="outline"
            size="md"
            icon={<ExternalLink className="w-4 h-4" />}
            className="!border-[#D4B87A]/40 !text-[#EFE3D5] hover:!bg-[#D4B87A]/15"
          >
            Follow on Instagram
          </Button>
        </div>

        {/* Open Photography Strip — Real Editorial Photos, No Boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visuals.map((item, idx) => (
            <a
              key={idx}
              href={BUSINESS_INFO.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-[#191715] shadow-lg block"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                <p className="text-xs font-medium text-[#EFE3D5] group-hover:text-[#D4B87A] transition-colors leading-tight">
                  {item.label}
                </p>
                <p className="text-[10px] text-[#D4B87A]/75 font-mono tracking-wider">
                  {item.tag}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
