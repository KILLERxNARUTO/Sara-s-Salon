import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Calendar } from 'lucide-react';
import { Instagram } from '@/components/icons/Instagram';
import { NAV_LINKS, BUSINESS_INFO, PHONE_LINKS } from '@/data/constants';
import { Button } from './Button';

import { Logo } from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#191715] text-[#F8F3ED] flex flex-col justify-between p-6 md:hidden overflow-y-auto"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#2A2623] pb-4">
            <Logo variant="light" size="sm" />
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#E5D3BF] hover:text-white hover:bg-[#2A2623] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 py-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `text-xl font-serif py-1 transition-colors ${
                    isActive
                      ? 'text-[#D4B87A] font-semibold pl-2 border-l-2 border-[#D4B87A]'
                      : 'text-[#EFE3D5] hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions & Contact Info */}
          <div className="border-t border-[#2A2623] pt-6 space-y-4">
            <Button
              href="/book"
              variant="primary"
              size="md"
              className="w-full text-center"
              onClick={onClose}
              icon={<Calendar className="w-4 h-4" />}
            >
              Book Appointment
            </Button>

            <div className="space-y-2 text-xs text-[#E5D3BF]/80 pt-2">
              <a
                href={PHONE_LINKS.primary}
                className="flex items-center gap-2 hover:text-[#D4B87A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B8955A]" />
                <span>+91 {BUSINESS_INFO.primary_phone}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B8955A] mt-0.5 shrink-0" />
                <span>{BUSINESS_INFO.address_line_1}, {BUSINESS_INFO.city}</span>
              </div>
              <a
                href={BUSINESS_INFO.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D4B87A] transition-colors pt-1"
              >
                <Instagram className="w-3.5 h-3.5 text-[#B8955A]" />
                <span>{BUSINESS_INFO.instagram_handle}</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
