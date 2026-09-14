import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateGeneralInquiryLink } from '@/utils/whatsapp';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = generateGeneralInquiryLink();

  return (
    <>
      {/* Floating WhatsApp Action Button for Desktop & Tablet */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sara's Beauty Studio"
        className="fixed bottom-20 md:bottom-8 right-6 z-40 flex items-center gap-2 bg-[#1D8A6E] hover:bg-[#176B57] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs uppercase tracking-wider font-semibold hidden md:inline-block">
          Chat With Us
        </span>
        {/* Pulse effect indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </a>
    </>
  );
};
