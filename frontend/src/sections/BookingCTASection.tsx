import React from 'react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Calendar, MessageCircle } from 'lucide-react';
import { generateGeneralInquiryLink } from '@/utils/whatsapp';

export const BookingCTASection: React.FC = () => {
  const whatsappUrl = generateGeneralInquiryLink();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#2A2623] via-[#191715] to-[#0F0E0D] text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-radial from-[#B8955A]/15 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center space-y-6">
        {/* Full Crown Logo Emblem */}
        <Logo layout="vertical" variant="light" size="md" showSubtitle={false} />

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
          Reserve Your Special{' '}
          <span className="italic font-normal bg-gradient-to-r from-[#D4B87A] via-[#EFE3D5] to-[#B8955A] bg-clip-text text-transparent">
            Beauty Appointment
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#E5D3BF]/80 font-light max-w-2xl mx-auto leading-relaxed">
          Step into a world of dedicated care, tranquil ambiance, and expert artistry. Book online in 60 seconds or connect instantly via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/book"
            variant="primary"
            size="lg"
            icon={<Calendar className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Book Online Now
          </Button>

          <Button
            href={whatsappUrl}
            isExternal
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            WhatsApp Instant Booking
          </Button>
        </div>
      </div>
    </section>
  );
};
