import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Instagram } from '@/components/icons/Instagram';
import { BUSINESS_INFO, PHONE_LINKS, EMAIL_LINK, NAV_LINKS } from '@/data/constants';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const serviceCategories = [
    { label: 'Bridal Makeover', href: '/bridal' },
    { label: 'Facial & Skin Care', href: '/services/facial' },
    { label: 'Hair Cut & Styling', href: '/services/hair' },
    { label: 'Waxing & Threading', href: '/services/waxing' },
    { label: 'Mehendi Artistry', href: '/services/mehendi' },
    { label: 'Manicure & Pedicure', href: '/services/manicure-pedicure' },
  ];

  return (
    <footer className="bg-[#191715] text-[#EFE3D5] pt-16 pb-28 md:pb-12 border-t border-[#2A2623]">
      <div className="container-custom">
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#2A2623]">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <Logo variant="light" size="md" layout="vertical" />
            <p className="text-sm text-[#E5D3BF]/75 leading-relaxed font-light mt-2">
              Guduvanchery's premier luxury salon dedicated to high-end bridal makeovers, rejuvenating skin treatments, expert hair styling, and customized self-care.
            </p>
            <div className="inline-block bg-[#2A2623] text-[#D4B87A] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-[#B8955A]/30">
              For Ladies & Kids Only
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-[#D4B87A]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="hover:text-[#D4B87A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/book" className="hover:text-[#D4B87A] transition-colors text-[#D4B87A]">
                  Book Appointment →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-[#D4B87A]">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              {serviceCategories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    to={cat.href}
                    className="hover:text-[#D4B87A] transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Studio Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-[#D4B87A]">
              Visit & Contact
            </h3>
            <div className="space-y-3 text-sm font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B8955A] mt-1 shrink-0" />
                <div>
                  <p>{BUSINESS_INFO.address_line_1}, {BUSINESS_INFO.address_line_2}</p>
                  <p>{BUSINESS_INFO.city}</p>
                  <p className="text-xs text-[#D4B87A] mt-0.5">({BUSINESS_INFO.landmark})</p>
                  <a
                    href={BUSINESS_INFO.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#B8955A] hover:underline mt-1 font-medium"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B8955A] mt-1 shrink-0" />
                <div className="space-y-1">
                  <a href={PHONE_LINKS.primary} className="block hover:text-[#D4B87A]">
                    +91 {BUSINESS_INFO.primary_phone}
                  </a>
                  <a href={PHONE_LINKS.secondary} className="block hover:text-[#D4B87A]">
                    +91 {BUSINESS_INFO.secondary_phone}
                  </a>
                  <a href={PHONE_LINKS.landline} className="block text-xs text-[#E5D3BF]/70 hover:text-[#D4B87A]">
                    Tel: {BUSINESS_INFO.landline}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B8955A] shrink-0" />
                <a href={EMAIL_LINK} className="hover:text-[#D4B87A] truncate text-xs">
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-[#B8955A] shrink-0" />
                <a
                  href={BUSINESS_INFO.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4B87A] text-xs"
                >
                  {BUSINESS_INFO.instagram_handle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#E5D3BF]/60 gap-4">
          <p>
            © {currentYear} {BUSINESS_INFO.business_name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Guduvanchery, Tamil Nadu</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-white">
              Studio Location
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
