import React from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Check, Sparkles, Calendar } from 'lucide-react';
import { generateBridalInquiryLink } from '@/utils/whatsapp';

export const PackagesPreviewSection: React.FC = () => {
  const packages = [
    {
      name: 'Signature Bridal',
      tier: 'SIGNATURE',
      description: 'Essential bridal glow package for pre-wedding ceremonies and intimate celebrations.',
      features: [
        'HD Bridal / Engagement Makeup',
        'Traditional / Modern Hair Styling',
        'Bridal Mehendi (Full Palm)',
        'Saree Draping & Ironing',
        'Lotus Radiant Skin Glow Facial',
      ],
      popular: false,
    },
    {
      name: 'Luxe Royal Bridal',
      tier: 'LUXE',
      description: 'Our most sought-after full-day wedding transformation experience.',
      features: [
        'Luxury Ultra HD / Airbrush Look',
        'Bespoke Bridal Hair with Flowers/Accessories',
        'Intricate Full Hand & Feet Mehendi',
        'O3+ Bridal Illuminating Facial & Bleach',
        'Saree Pre-Pleating & Box Folding Included',
        'Classic Pedicure & Manicure Pampering',
      ],
      popular: true,
    },
    {
      name: 'Imperial Heritage Bridal',
      tier: 'ROYAL',
      description: 'Comprehensive multi-event bridal luxury with dedicated master artist.',
      features: [
        'Muhurtham + Reception Complete Looks',
        'Advanced Pre-Bridal Skin & Hair Spa Regime',
        'Full Bridal Royal Mehendi Artistry',
        'Premium Rica Waxing & Delan Treatment',
        '2x Saree Drapings & Touch-up Assistance',
        'Crystal Manicure & Crystal Pedicure',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#191715] text-[#F8F3ED]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Curated Bridal Tiers"
          title="Bridal Makeover Packages"
          description="Handcrafted packages designed for modern brides wanting effortless grace, lasting radiance, and flawless finish."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-12">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#2A2623] to-[#1F1C1A] border-2 border-[#D4B87A] shadow-2xl scale-105 z-10'
                  : 'bg-[#2A2623]/60 border border-[#B8955A]/20 hover:border-[#B8955A]/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B8955A] text-[#191715] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D4B87A]">
                  {pkg.tier}
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mt-1 mb-3">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[#E5D3BF]/70 font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#EFE3D5]/90">
                      <Check className="w-4 h-4 text-[#D4B87A] shrink-0 mt-0.5" />
                      <span className="font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <Button
                  href={generateBridalInquiryLink(pkg.name)}
                  isExternal
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                  icon={<Calendar className="w-3.5 h-3.5" />}
                >
                  Inquire Package
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
