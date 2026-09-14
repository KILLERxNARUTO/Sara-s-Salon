import React, { useState } from 'react';
import { EXPERIENCE_OPTIONS } from '@/data/constants';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceFinderSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('wedding');

  const activeOption = EXPERIENCE_OPTIONS.find((opt) => opt.id === selectedId) || EXPERIENCE_OPTIONS[0];

  return (
    <section className="py-20 md:py-28 bg-[#EFE3D5]/50 border-b border-[#E5D3BF]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Curated Recommendations"
          title="Find Your Perfect Experience"
          description="Select an upcoming occasion or beauty objective to discover our handpicked service packages."
          align="center"
        />

        {/* Occasion Selection Chips */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 max-w-4xl mx-auto">
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isSelected = opt.id === selectedId;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedId(opt.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#191715] text-white shadow-md scale-105 border border-[#191715]'
                    : 'bg-white text-[#2A2623] hover:bg-[#F8F3ED] border border-[#E5D3BF]'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Matched Recommendations Result Box */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E5D3BF] shadow-lg max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#E5D3BF]/60 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl p-3 bg-[#EFE3D5] rounded-2xl">
                {activeOption.icon}
              </span>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B8955A] font-bold">
                  Recommended For You
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#191715]">
                  {activeOption.label} Special Package
                </h3>
              </div>
            </div>

            <Button
              href={`/book?occasion=${encodeURIComponent(activeOption.label)}`}
              variant="primary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
              className="w-full md:w-auto"
            >
              Book This Ritual
            </Button>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2A2623]/70 mb-4">
              Included / Suggested Signature Services:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeOption.recommendedServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8F3ED] border border-[#E5D3BF]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1D8A6E] shrink-0" />
                  <span className="text-sm font-medium text-[#191715]">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
