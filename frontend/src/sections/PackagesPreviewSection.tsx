import React from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Check, Calendar } from 'lucide-react';
import { generateBridalInquiryLink } from '@/utils/whatsapp';

export const PackagesPreviewSection: React.FC = () => {
  const packages = [
    {
      name: 'Signature Bridal',
      tier: 'Tier 01',
      description: 'Essential bridal glow package for pre-wedding ceremonies, engagement and intimate celebrations.',
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
      tier: 'Tier 02 • Recommended',
      description: 'Our most requested full-day wedding transformation experience with master styling.',
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
      tier: 'Tier 03',
      description: 'Comprehensive multi-event bridal luxury with dedicated master artist throughout.',
      features: [
        'Muhurtham and Reception Complete Looks',
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
    <section className="py-20 md:py-32 bg-[#121110] text-[#F8F3ED] border-b border-[#B8955A]/20">
      <div className="container-custom">
        <SectionHeading
          subtitle="Curated Bridal Tiers"
          title="Bridal Transformation Tiers"
          description="Handcrafted bridal packages designed for effortless grace, lasting radiance, and flawless muhurtham photography."
          align="center"
          theme="dark"
        />

        {/* Open Editorial Columns — Completely Free of Boxes & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 mt-14 border-t border-b border-white/10 py-10 md:py-14">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex flex-col justify-between px-4 sm:px-8 py-8 md:py-0 ${
                pkg.popular ? 'bg-white/[0.015]' : ''
              }`}
            >
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4B87A] font-semibold block mb-3">
                  {pkg.tier}
                </span>

                <h3 className="text-2xl sm:text-3xl font-normal text-white mb-4 tracking-tight">
                  {pkg.name}
                </h3>

                <p className="text-xs text-[#E5D3BF]/70 font-light leading-relaxed mb-8">
                  {pkg.description}
                </p>

                {/* Features List with Clean Hairline Items */}
                <div className="space-y-3.5 pt-6 border-t border-white/10 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-[#EFE3D5]">
                      <Check className="w-3.5 h-3.5 text-[#D4B87A] shrink-0 mt-0.5" />
                      <span className="font-light tracking-wide leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4">
                <Button
                  href={generateBridalInquiryLink(pkg.name)}
                  isExternal
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                  icon={<Calendar className="w-3.5 h-3.5" />}
                >
                  Inquire {pkg.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
