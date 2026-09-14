import React from 'react';
import { BRIDAL_TIMELINE } from '@/data/constants';
import { SectionHeading } from '@/components/SectionHeading';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Sparkles, Calendar, MessageCircle } from 'lucide-react';
import { generateBridalInquiryLink } from '@/utils/whatsapp';

export const BridalExperienceSection: React.FC = () => {
  const bridalWhatsApp = generateBridalInquiryLink();

  return (
    <section className="py-20 md:py-28 bg-[#191715] text-[#F8F3ED] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-radial from-[#B8955A]/10 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10 flex flex-col items-center">
        {/* Full Crown Logo Emblem */}
        <Logo layout="vertical" variant="light" size="sm" showSubtitle={false} className="mb-3" />
        <SectionHeading
          subtitle="Sara's Bridal Couture"
          title="The Bridal Transformation Experience"
          description="From pre-wedding skincare and custom mehendi to bespoke bridal makeover and saree draping, we make your big day truly magical."
          align="center"
          theme="dark"
        />

        {/* 5-Step Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12 mb-16">
          {BRIDAL_TIMELINE.map((step) => (
            <div
              key={step.number}
              className="bg-[#2A2623]/60 border border-[#B8955A]/20 hover:border-[#B8955A]/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 relative group"
            >
              <div className="font-serif text-3xl font-bold text-[#D4B87A]/40 group-hover:text-[#D4B87A] transition-colors mb-4">
                {step.number}
              </div>
              <h3 className="text-base font-semibold tracking-wider uppercase text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[#E5D3BF]/75 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bridal Highlight Banner */}
        <div className="bg-gradient-to-r from-[#2A2623] via-[#1E1B19] to-[#2A2623] border border-[#B8955A]/40 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4B87A]">
              <Sparkles className="w-4 h-4 text-[#D4B87A]" />
              <span>Complimentary Consultation</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
              Book Your Custom Bridal Consultation
            </h3>
            <p className="text-sm text-[#E5D3BF]/80 font-light leading-relaxed">
              Meet our master makeover artists to discuss your wedding attire, skin regime, mehendi patterns, and hair styles with tailored bridal packages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
            <Button
              href={bridalWhatsApp}
              isExternal
              variant="whatsapp"
              size="md"
              icon={<MessageCircle className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              WhatsApp Bridal Team
            </Button>
            <Button
              href="/bridal"
              variant="primary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              View Bridal Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
