import React from 'react';
import { BEAUTY_JOURNEY_STEPS } from '@/data/constants';
import { SectionHeading } from '@/components/SectionHeading';

export const BeautyJourneySection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#EFE3D5]/40 border-b border-[#E5D3BF]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Our Philosophy"
          title="The Sara's Beauty Journey"
          description="Every visit is a curated self-care ritual designed to elevate your natural charm and inner radiance."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {BEAUTY_JOURNEY_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-[#E5D3BF] shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center group"
            >
              {/* Step Number Circle */}
              <div className="w-12 h-12 rounded-full bg-[#EFE3D5] text-[#886835] font-serif font-bold text-lg flex items-center justify-center mb-4 group-hover:bg-[#B8955A] group-hover:text-white transition-colors">
                {step.number}
              </div>

              <h3 className="font-serif text-lg font-semibold tracking-wider text-[#191715] mb-2">
                {step.title}
              </h3>

              <p className="text-xs text-[#2A2623]/75 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
