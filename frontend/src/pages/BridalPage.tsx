import React from 'react';
import { BridalExperienceSection } from '@/sections/BridalExperienceSection';
import { PackagesPreviewSection } from '@/sections/PackagesPreviewSection';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Calendar, MessageCircle } from 'lucide-react';
import { generateBridalInquiryLink } from '@/utils/whatsapp';

export const BridalPage: React.FC = () => {
  const bridalWhatsApp = generateBridalInquiryLink();

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-[#191715] text-[#F8F3ED] py-16 md:py-24 border-b border-[#2A2623] text-center">
        <div className="container-custom max-w-4xl mx-auto flex flex-col items-center space-y-6">
          {/* Full Crown & Flourish Logo Image */}
          <Logo layout="vertical" variant="light" size="lg" showSubtitle={false} />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
            Exquisite Bridal Couture & Makeovers
          </h1>
          <p className="text-base sm:text-lg text-[#E5D3BF]/80 font-light max-w-2xl mx-auto leading-relaxed">
            From Muhurtham to Reception, our signature bridal packages blend traditional elegance with contemporary luxury for your most unforgettable day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              href={bridalWhatsApp}
              isExternal
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-4 h-4" />}
            >
              WhatsApp Bridal Inquiry
            </Button>
            <Button
              href="/book?service=Bridal"
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book Bridal Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Bridal Experience Timeline */}
      <BridalExperienceSection />

      {/* Bridal Packages */}
      <PackagesPreviewSection />
    </div>
  );
};
