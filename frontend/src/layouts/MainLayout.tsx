import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PHONE_LINKS } from '@/data/constants';
import { generateGeneralInquiryLink } from '@/utils/whatsapp';

export const MainLayout: React.FC = () => {
  const whatsappUrl = generateGeneralInquiryLink();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3ED] text-[#191715] selection:bg-[#B8955A] selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating Desktop WhatsApp Button */}
      <WhatsAppButton />

      {/* Mobile Bottom Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#191715] border-t border-[#2A2623] px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={PHONE_LINKS.primary}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#2A2623] text-[#EFE3D5] text-xs font-medium hover:bg-[#3A3633] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#B8955A]" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#1D8A6E] text-white text-xs font-medium hover:bg-[#176B57] transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/book"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#B8955A] text-white text-xs font-medium hover:bg-[#A07D45] transition-colors shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </Link>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
