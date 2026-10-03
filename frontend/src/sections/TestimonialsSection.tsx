import React, { useState } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sundaram',
    location: 'Guduvanchery',
    service: 'Muhurtham Bridal Makeover',
    quote: 'Sara did my bridal makeover for both Muhurtham and Reception. The makeup stayed fresh through the entire 12 hours without a single crease. Everyone praised the natural glow and saree draping with genuine appreciation.'
  },
  {
    id: 2,
    name: 'Kavitha Ramachandran',
    location: 'Mahalakshmi Nagar',
    service: 'O3+ Facial & Keratin Hair Spa',
    quote: 'The most tranquil and private salon in Guduvanchery. Dedicated ladies-only environment, exceptionally clean tools, and genuine brand products. My skin felt remarkably revived immediately.'
  },
  {
    id: 3,
    name: 'Deepika Varadhan',
    location: 'Urapakkam',
    service: 'Bridal Mehendi & Pre-Pleating',
    quote: 'Intricate mehendi design and the saree pre-pleating saved us precious hours on wedding morning. Completely professional, courteous, and highly recommended for every bride.'
  },
  {
    id: 4,
    name: 'Pooja Venkatesh',
    location: 'Near NPR Mandapam',
    service: 'HD Reception Glam & Hair Styling',
    quote: 'I was very nervous about heavy makeup, but Sara delivered a subtle, radiant glass-skin look. The eye makeup paired with my reception lehenga was completely sensational.'
  },
  {
    id: 5,
    name: 'Swetha Karthik',
    location: 'Vandalur',
    service: 'Engagement Makeover & Saree Fold',
    quote: 'Booked Sara for my engagement ceremony. The team arrived right on time, completed the styling within 90 minutes, and the saree pleats stayed flawless throughout the evening.'
  },
  {
    id: 6,
    name: 'Harini Prakash',
    location: 'Chengalpattu',
    service: 'Complete Bridal Package',
    quote: 'Took the complete 3-day bridal package including mehendi, body spa, pre-bridal cleanup, and wedding makeup. Pure 5-star experience from start to finish.'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-[#F8F3ED] overflow-hidden border-b border-[#E5D3BF]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Client Stories"
          title="Words of Appreciation"
          description="Real reflections from brides and guests across Guduvanchery and Chennai."
          align="center"
        />

        {/* Open Editorial Quote Spread — Zero Boxes, Zero Cards */}
        <div className="max-w-4xl mx-auto mt-12 text-center flex flex-col items-center">
          {/* Subtle Rating Indicator */}
          <div className="flex items-center gap-2 mb-8 text-xs uppercase tracking-[0.2em] text-[#886835] font-semibold">
            <span>Verified Guest Reflection</span>
            <span>•</span>
            <span>4.9 / 5.0 Rating</span>
          </div>

          {/* Large Editorial Quote */}
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-[#191715] leading-relaxed tracking-tight min-h-[160px] flex items-center justify-center">
            "{current.quote}"
          </blockquote>

          {/* Attribution & Context */}
          <div className="mt-8 space-y-1">
            <h4 className="text-base font-medium text-[#191715]">
              {current.name}
            </h4>
            <p className="text-xs text-[#B8955A] font-light">
              {current.service} • {current.location}
            </p>
          </div>

          {/* Minimalist Controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={prevReview}
              className="p-2 rounded-full border border-[#D4B87A]/40 text-[#191715] hover:text-[#B8955A] hover:border-[#B8955A] transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-[#2A2623]/60 tracking-widest">
              0{currentIndex + 1} / 0{REVIEWS.length}
            </span>

            <button
              onClick={nextReview}
              className="p-2 rounded-full border border-[#D4B87A]/40 text-[#191715] hover:text-[#B8955A] hover:border-[#B8955A] transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
