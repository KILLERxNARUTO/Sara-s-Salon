import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';
import { BUSINESS_INFO, PHONE_LINKS, EMAIL_LINK } from '@/data/constants';
import { Button } from '@/components/Button';
import { SectionHeading } from '@/components/SectionHeading';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F8F3ED]">
      <div className="container-custom">
        <SectionHeading
          subtitle="Studio Location"
          title="Visit Us in Guduvanchery"
          description="Easily accessible from GST Road, located near NPR Mandapam, Mahalakshmi Nagar."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Studio Contact Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-[#E5D3BF] shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFE3D5] flex items-center justify-center text-[#886835]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#191715]">
                    {BUSINESS_INFO.business_name}
                  </h3>
                  <p className="text-xs text-[#886835] font-semibold uppercase tracking-wider">
                    For Ladies & Kids Only
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E5D3BF]/60 text-sm">
                <div>
                  <p className="font-semibold text-[#191715]">Studio Address:</p>
                  <p className="text-[#2A2623]/80 font-light">{BUSINESS_INFO.address_line_1}, {BUSINESS_INFO.address_line_2}</p>
                  <p className="text-[#2A2623]/80 font-light">{BUSINESS_INFO.city}</p>
                  <p className="text-xs text-[#886835] font-medium mt-1">Landmark: {BUSINESS_INFO.landmark}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="font-semibold text-[#191715] mb-1">Direct Calling:</p>
                    <a href={PHONE_LINKS.primary} className="block text-[#B8955A] hover:underline font-medium">
                      +91 {BUSINESS_INFO.primary_phone}
                    </a>
                    <a href={PHONE_LINKS.secondary} className="block text-[#2A2623]/80 hover:underline">
                      +91 {BUSINESS_INFO.secondary_phone}
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold text-[#191715] mb-1">Landline & Email:</p>
                    <a href={PHONE_LINKS.landline} className="block text-[#2A2623]/80 hover:underline">
                      {BUSINESS_INFO.landline}
                    </a>
                    <a href={EMAIL_LINK} className="block text-xs text-[#2A2623]/80 hover:underline truncate mt-0.5">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-[#E5D3BF]/60 flex flex-col sm:flex-row gap-3">
              <Button
                href={BUSINESS_INFO.google_maps_url}
                isExternal
                variant="primary"
                size="md"
                icon={<Navigation className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Get Directions on Google Maps
              </Button>
            </div>
          </div>

          {/* Location Map Preview Panel (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#2A2623] to-[#191715] text-white rounded-3xl p-8 border border-[#B8955A]/30 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4B87A] font-bold">
                Location Highlights
              </span>
              <h4 className="font-serif text-2xl font-normal">
                Conveniently Located in Guduvanchery
              </h4>
              <p className="text-xs text-[#E5D3BF]/80 font-light leading-relaxed">
                Situated right on Mahalakshmi Nagar Main Road, with easy access and dedicated private parking for clients.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Near NPR Mandapam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Close to GST Road Junction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Private & Secure Environment</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10">
              <a
                href={BUSINESS_INFO.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4B87A] hover:text-white transition-colors"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
