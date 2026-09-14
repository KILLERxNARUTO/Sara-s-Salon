import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Calendar, Phone } from 'lucide-react';
import { NAV_LINKS, PHONE_LINKS } from '@/data/constants';
import { Logo } from './Logo';
import { Button } from './Button';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-[#191715] text-[#EFE3D5] text-[11px] uppercase tracking-[0.2em] py-1.5 px-4 text-center border-b border-[#2A2623] flex items-center justify-between container-custom">
        <span className="hidden sm:inline-block text-[#D4B87A] font-medium">
          ✨ Sara's Makeover Artistry — Luxury Salon
        </span>
        <span className="mx-auto sm:mx-0 font-semibold tracking-[0.25em] text-white">
          FOR LADIES & KIDS ONLY
        </span>
        <div className="hidden md:flex items-center gap-4 text-xs font-normal">
          <a href={PHONE_LINKS.primary} className="hover:text-[#D4B87A] flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#B8955A]" />
            <span>97906 90628</span>
          </a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F3ED]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#E5D3BF]/60'
            : 'bg-[#F8F3ED] py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#B8955A]'
                      : 'text-[#2A2623] hover:text-[#B8955A]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8955A] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              href="/book"
              variant="primary"
              size="sm"
              icon={<Calendar className="w-3.5 h-3.5" />}
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              href="/book"
              variant="primary"
              size="sm"
              className="!px-3 !py-1.5 text-[11px]"
            >
              Book
            </Button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#191715] hover:text-[#B8955A] rounded-md focus:outline-none cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
