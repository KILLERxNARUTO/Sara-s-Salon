import React, { useState } from 'react';
import { EXPERIENCE_OPTIONS } from '@/data/constants';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Calendar, ArrowRight } from 'lucide-react';

export const ExperienceFinderSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('wedding');

  const activeOption = EXPERIENCE_OPTIONS.find((opt) => opt.id === selectedId) || EXPERIENCE_OPTIONS[0];

  return (
    <section className="py-20 md:py-28 bg-[#F5EFE6]/60 border-b border-[#E5D3BF]/60">
      <div className="container-custom">
        <SectionHeading
          subtitle="Curated Recommendations"
          title="Find Your Personal Ritual"
          description="Select your upcoming occasion or self-care objective to reveal tailored recommendations curated by our senior stylists."
          align="center"
        />

        {/* Minimalist Occasion Selector Filter Strip — Clean typography, zero emojis */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 max-w-4xl mx-auto">
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isSelected = opt.id === selectedId;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedId(opt.id)}
                className={`px-4 py-2 text-xs md:text-sm tracking-wide transition-all duration-300 cursor-pointer rounded-full ${
                  isSelected
                    ? 'bg-[#191715] text-[#D4B87A] font-medium shadow-sm'
                    : 'text-[#2A2623]/70 hover:text-[#191715] hover:bg-[#EFE3D5]/80'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Open Editorial Layout — Completely Box-Free */}
        <div className="max-w-4xl mx-auto pt-6 border-t border-[#D4B87A]/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Column: Ritual Title, Context & Booking Action */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B8955A] font-semibold block">
                Recommended Atelier Ritual
              </span>

              <h3 className="text-2xl sm:text-3xl font-normal text-[#191715] leading-tight tracking-tight">
                {activeOption.label} Special
              </h3>

              <p className="text-sm text-[#2A2623]/70 font-light leading-relaxed">
                Handpicked combination of treatments synchronized for maximum radiance, longevity, and relaxing care.
              </p>

              <div className="pt-3">
                <Button
                  href={`/book?occasion=${encodeURIComponent(activeOption.label)}`}
                  variant="primary"
                  size="md"
                  icon={<Calendar className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Reserve This Ritual
                </Button>
              </div>
            </div>

            {/* Right Column: Inclusions List with Clean Minimalist Dividers */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[#2A2623]/60 font-semibold block mb-4">
                Curated Treatment Inclusions
              </span>

              <div className="divide-y divide-[#E5D3BF]">
                {activeOption.recommendedServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex items-center justify-between text-sm text-[#191715] group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8955A]" />
                      <span className="font-light tracking-wide text-sm">{service}</span>
                    </div>

                    <span className="text-xs text-[#B8955A] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium">
                      <span>Included</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
