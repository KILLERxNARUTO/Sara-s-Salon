import React from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sundaram',
    location: 'Guduvanchery',
    service: 'Muhurtham Bridal Makeover',
    rating: 5,
    date: '2 weeks ago',
    quote: 'Sara did my bridal makeover for both Muhurtham and Reception. The makeup stayed fresh through the entire 12 hours without a single crease. Everyone praised the natural glow and saree draping!'
  },
  {
    id: 2,
    name: 'Kavitha Ramachandran',
    location: 'Mahalakshmi Nagar',
    service: 'O3+ Facial & Keratin Hair Spa',
    rating: 5,
    date: '1 month ago',
    quote: 'The most relaxing and private salon in Guduvanchery! Dedicated ladies-only environment, exceptionally clean tools, and genuine brand products. My skin felt glowing immediately.'
  },
  {
    id: 3,
    name: 'Deepika Varadhan',
    location: 'Urapakkam',
    service: 'Bridal Mehendi & Pre-Pleating',
    rating: 5,
    date: '3 weeks ago',
    quote: 'Intricate mehendi design and the saree pre-pleating saved us so much precious time on wedding morning. Super professional, courteous, and highly recommended!'
  },
  {
    id: 4,
    name: 'Pooja Venkatesh',
    location: 'Near NPR Mandapam',
    service: 'HD Reception Glam & Hair Styling',
    rating: 5,
    date: '2 months ago',
    quote: 'I was very nervous about heavy makeup, but Sara gave me such a subtle, glass-skin radiant look! The eye makeup paired with my lehenga was completely sensational.'
  },
  {
    id: 5,
    name: 'Meenakshi Sundar',
    location: 'Kattankulathur (SRM)',
    service: 'Rica Waxing & Crystal Pedicure',
    rating: 5,
    date: '3 weeks ago',
    quote: 'Rica wax here is virtually painless and done so smoothly. The foot reflexology massage in the private cabin put me right to sleep after a hectic work week.'
  },
  {
    id: 6,
    name: 'Swetha Karthik',
    location: 'Vandalur',
    service: 'Engagement Makeover & Saree Fold',
    rating: 5,
    date: '1 month ago',
    quote: 'Booked Sara for my engagement ceremony. The team arrived right on time, prepared the look within 90 minutes, and the saree pleats stayed intact all evening!'
  },
  {
    id: 7,
    name: 'Divya Bharathi',
    location: 'Guduvanchery Main Rd',
    service: 'Gold Facial & Haircut',
    rating: 5,
    date: 'Just recently',
    quote: 'Regular visitor here for the past 4 years. Never disappointed! Cleanest salon in the area with 100% female staff and very reasonable pricing for branded products.'
  },
  {
    id: 8,
    name: 'Harini Prakash',
    location: 'Chengalpattu',
    service: 'Complete Bridal Package',
    rating: 5,
    date: 'Last month',
    quote: 'Took the complete 3-day bridal package including mehendi, body spa, pre-bridal cleanup, and wedding makeup. Pure 5-star experience from start to finish!'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F8F3ED] overflow-hidden relative">
      <div className="container-custom mb-12">
        <SectionHeading
          subtitle="Client Stories"
          title="Loved by 1,000+ Women"
          description="Read real words from our cherished brides and salon guests across Guduvanchery, Tambaram, and Chennai."
          align="center"
        />

        {/* Google Rating Overview Badge */}
        <div className="flex items-center justify-center gap-4 text-xs text-[#2A2623]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5D3BF] shadow-sm">
            <span className="font-bold text-[#191715] flex items-center gap-1 font-serif text-sm">
              <span className="text-blue-500 font-sans font-bold">G</span> 4.9 ★★★★★
            </span>
            <span className="text-[#2A2623]/60">• 100+ Verified Google Reviews</span>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Feedback Row (Right to Left Continuous) */}
      <div className="relative w-full">
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F3ED] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F3ED] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 px-4 hover:[animation-play-state:paused]">
          {/* Loop 1 */}
          {REVIEWS.map((item) => (
            <div
              key={`review-1-${item.id}`}
              className="w-[340px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-7 border border-[#E5D3BF] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group hover:border-[#B8955A]"
            >
              <div>
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#B8955A]/25 mb-2 group-hover:text-[#B8955A] transition-colors" />

                <p className="text-xs sm:text-sm text-[#2A2623]/85 font-light leading-relaxed italic mb-4">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5D3BF]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#191715] group-hover:text-[#886835] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#B8955A] font-medium">{item.service}</p>
                </div>
                <span className="text-[10px] text-[#2A2623]/50 font-medium px-2 py-1 rounded bg-[#F8F3ED]">
                  {item.location}
                </span>
              </div>
            </div>
          ))}

          {/* Loop 2 (Seamless loop) */}
          {REVIEWS.map((item) => (
            <div
              key={`review-2-${item.id}`}
              className="w-[340px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-7 border border-[#E5D3BF] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group hover:border-[#B8955A]"
            >
              <div>
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#B8955A]/25 mb-2 group-hover:text-[#B8955A] transition-colors" />

                <p className="text-xs sm:text-sm text-[#2A2623]/85 font-light leading-relaxed italic mb-4">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5D3BF]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#191715] group-hover:text-[#886835] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#B8955A] font-medium">{item.service}</p>
                </div>
                <span className="text-[10px] text-[#2A2623]/50 font-medium px-2 py-1 rounded bg-[#F8F3ED]">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
