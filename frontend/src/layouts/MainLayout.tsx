import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { PHONE_LINKS } from '@/data/constants';
import { generateGeneralInquiryLink } from '@/utils/whatsapp';

export const MainLayout: React.FC = () => {
  const whatsappUrl = generateGeneralInquiryLink();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8F3ED] text-[#191715] selection:bg-[#B8955A] selection:text-white overflow-x-hidden">
      {/* Precision Gold Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#D4B87A]/15 to-transparent blur-3xl animate-slow-breathe" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-[#EFE3D5]/40 via-[#D4B87A]/10 to-transparent blur-3xl animate-slow-breathe" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[#D4B87A]/10 to-transparent blur-3xl animate-slow-breathe" style={{ animationDelay: '8s' }} />
      </div>

      {/* Navigation Header */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Main Routed Page Content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Floating Desktop WhatsApp Button */}
      <WhatsAppButton />

      {/* Mobile Bottom Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#191715]/95 backdrop-blur-md border-t border-[#B8955A]/30 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
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
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-gradient-to-r from-[#B8955A] to-[#D4B87A] text-white text-xs font-medium hover:brightness-110 transition-all shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </Link>
      </div>

      {/* Global Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};
