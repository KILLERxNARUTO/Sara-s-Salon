import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import { BUSINESS_INFO, PHONE_LINKS, EMAIL_LINK, SALON_BRANCHES } from '@/data/constants';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#F8F3ED] border-b border-[#E5D3BF]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Studio Locations"
          title="Visit Us in Guduvanchery"
          description="Exclusively serving ladies & kids across two well-appointed salon branches in Guduvancheri, Tamil Nadu."
          align="center"
        />

        {/* Open Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto mt-12">
          {/* Left Column: Branches & Contact */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8955A] font-semibold block">
                Two Salon Branches
              </span>

              {SALON_BRANCHES.map((branch, idx) => (
                <div
                  key={branch.id}
                  className="p-4 rounded-xl bg-white border border-[#E5D3BF] space-y-1.5 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B8955A] shrink-0" />
                    <span className="text-xs uppercase font-semibold text-[#191715] tracking-wider">
                      Branch {idx + 1}: {branch.shortName}
                    </span>
                  </div>
                  <p className="text-xs text-[#2A2623]/80 leading-relaxed font-light pl-6">
                    {branch.address}
                  </p>
                  <p className="text-[11px] text-[#A07D45] font-medium pl-6">
                    Landmark: {branch.landmark}
                  </p>
                </div>
              ))}

              <span className="inline-block text-xs uppercase tracking-widest text-[#B8955A] font-medium pt-1">
                Exclusively For Ladies & Kids
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5D3BF]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#2A2623]/60 block mb-1.5 font-medium">
                  Direct Line
                </span>
                <a
                  href={PHONE_LINKS.primary}
                  className="block text-sm text-[#191715] hover:text-[#B8955A] font-medium transition-colors"
                >
                  +91 {BUSINESS_INFO.primary_phone}
                </a>
                <a
                  href={PHONE_LINKS.secondary}
                  className="block text-sm text-[#2A2623]/70 hover:text-[#B8955A] transition-colors mt-0.5"
                >
                  +91 {BUSINESS_INFO.secondary_phone}
                </a>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#2A2623]/60 block mb-1.5 font-medium">
                  Landline & Email
                </span>
                <a
                  href={PHONE_LINKS.landline}
                  className="block text-sm text-[#191715] hover:text-[#B8955A] transition-colors"
                >
                  {BUSINESS_INFO.landline}
                </a>
                <a
                  href={EMAIL_LINK}
                  className="block text-xs text-[#2A2623]/70 hover:text-[#B8955A] transition-colors mt-0.5 truncate"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                href={BUSINESS_INFO.google_maps_url}
                isExternal
                variant="primary"
                size="md"
                icon={<Navigation className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Get Directions (Branch 1)
              </Button>
              <Button
                href="/book"
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
              >
                Book Appointment Online
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Studio Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#191715]">
              <img
                src="/images/studio_map.jpg"
                alt="Sara's Beauty Studio Location Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between">
                <span className="font-light text-[#E5D3BF]">Mahalakshmi Nagar & Madambakkam Rd</span>
                <span className="text-[#D4B87A] font-medium uppercase tracking-wider text-[10px]">
                  Open Daily 9:30 AM – 8:30 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
