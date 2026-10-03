"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Calendar,
  ChevronRight,
  Crown,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import StaggeredMenu, {
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem,
} from "@/components/ui/StaggeredMenu";
import { PHONE_LINKS } from "@/data/constants";

export interface NavigationSection {
  title: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderProps {
  navigationData?: NavigationSection[];
}

export default function Header({ navigationData }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4 curated desktop anchor links to keep the capsule clean and uncrowded
  const desktopNavLinks = [
    { title: "Services", href: "/services" },
    { title: "Bridal Couture", href: "/bridal" },
    { title: "Packages", href: "/packages" },
    { title: "Gallery", href: "/gallery" },
  ];

  // Comprehensive directory items for the GSAP Staggered Menu
  const staggeredMenuItems: StaggeredMenuItem[] = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Services", ariaLabel: "View our luxury services", link: "/services" },
    { label: "Bridal Couture", ariaLabel: "Muhurtham and reception bridal", link: "/bridal" },
    { label: "Packages", ariaLabel: "Curated beauty packages", link: "/packages" },
    { label: "Gallery", ariaLabel: "Client transformations showcase", link: "/gallery" },
    { label: "Testimonials", ariaLabel: "Client reviews and feedback", link: "/testimonials" },
    { label: "About Atelier", ariaLabel: "Learn about Sara studio", link: "/about" },
    { label: "Contact & Map", ariaLabel: "Get in touch with us", link: "/contact" },
    { label: "Book Appointment", ariaLabel: "Reserve appointment slot", link: "/book" },
  ];

  const staggeredSocialItems: StaggeredMenuSocialItem[] = [
    { label: "Instagram", link: "https://www.instagram.com/saras_beauty_and_bridal_studio/" },
    { label: "WhatsApp", link: "https://wa.me/919790690628" },
    { label: "Call 97906 90628", link: "tel:+919790690628" },
    { label: "Directions", link: "https://maps.app.goo.gl/Kfnfiuj1XD1TVM6H7" },
  ];

  return (
    <div className="fixed top-2 sm:top-3 md:top-4 inset-x-0 z-50 flex flex-col items-center pointer-events-none px-3 sm:px-6">
      {/* Micro Studio Announcement Pill (Gently glides away on heavy scroll) */}
      <div
        className={`pointer-events-auto hidden md:inline-flex items-center gap-3 px-4 py-1 rounded-full bg-[#110F0E]/90 border border-[#D4B87A]/25 backdrop-blur-xl text-[10px] uppercase tracking-[0.22em] text-[#D4B87A] mb-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all duration-300 ${isScrolled ? "opacity-0 -translate-y-2 pointer-events-none h-0 py-0 mb-0 overflow-hidden" : "opacity-100 translate-y-0"
          }`}
      >
        <div className="flex items-center gap-1.5 text-white/90">
          <Crown className="w-3 h-3 text-[#D4B87A]" />
          <span className="font-semibold text-[#D4B87A]">EXCLUSIVE LADIES &amp; KIDS STUDIO</span>
        </div>
        <span className="text-white/20">•</span>
        <span className="text-[#E5D3BF]/75 font-light">Near NPR Mandapam, Guduvanchery</span>
        <span className="text-white/20">•</span>
        <a
          href={PHONE_LINKS.primary}
          className="flex items-center gap-1 text-[#E5D3BF] hover:text-[#D4B87A] font-medium transition-colors"
        >
          <Phone className="w-2.5 h-2.5 text-[#D4B87A]" />
          <span>97906 90628</span>
        </a>
      </div>

      {/* Main Floating Luxury Capsule Navbar */}
      <header
        className={`pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-500 px-3 sm:px-5 py-2 flex items-center justify-between border ${isScrolled
            ? "bg-[#141210]/95 backdrop-blur-2xl border-[#D4B87A]/45 shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,184,122,0.2)] py-2"
            : "bg-[#141210]/85 backdrop-blur-xl border-[#D4B87A]/30 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_22px_rgba(212,184,122,0.12)] hover:border-[#D4B87A]/50 py-2.5"
          }`}
      >
        {/* Left: Brand Logo with Bespoke Golden Crowned S Emblem */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group pl-1 flex-shrink-0">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Sara's Atelier Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_12px_rgba(212,184,122,0.6)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] text-[#FDFBF7] uppercase leading-none">
              SARA'S
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.26em] text-[#D4B87A] uppercase mt-0.5 font-light">
              BEAUTY &amp; BRIDAL
            </span>
          </div>
        </Link>

        {/* Center: Curated Navigation Links (Desktop only, perfectly spaced) */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="space-x-1 xl:space-x-2">
              {desktopNavLinks.map((item) => {
                const isCurrentActive = location.pathname.startsWith(item.href);

                // Services Mega-Menu Dropdown
                if (item.title === "Services") {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger
                        className={`bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 rounded-full text-xs uppercase tracking-[0.14em] font-medium h-8 px-3.5 transition-all ${isCurrentActive
                            ? "text-[#D4B87A] bg-white/[0.08] shadow-[inset_0_0_12px_rgba(212,184,122,0.15)]"
                            : "text-[#E5D3BF]/75 hover:text-white"
                          }`}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="w-[440px] p-2">
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            to="/services"
                            className="p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-[#D4B87A]/25 group"
                          >
                            <div className="text-xs font-semibold text-[#D4B87A] uppercase tracking-wider mb-1 group-hover:translate-x-0.5 transition-transform">
                              Complete Catalog
                            </div>
                            <p className="text-[11px] text-[#E5D3BF]/70 leading-relaxed font-light">
                              Hair styling, skin rejuvenation &amp; spa rituals.
                            </p>
                          </Link>
                          <Link
                            to="/bridal"
                            className="p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-[#D4B87A]/25 group"
                          >
                            <div className="text-xs font-semibold text-[#D4B87A] uppercase tracking-wider mb-1 group-hover:translate-x-0.5 transition-transform">
                              Bridal Couture
                            </div>
                            <p className="text-[11px] text-[#E5D3BF]/70 leading-relaxed font-light">
                              Luxury HD &amp; Airbrush muhurtham bridal makeovers.
                            </p>
                          </Link>
                          <Link
                            to="/packages"
                            className="p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-[#D4B87A]/25 group"
                          >
                            <div className="text-xs font-semibold text-[#D4B87A] uppercase tracking-wider mb-1 group-hover:translate-x-0.5 transition-transform">
                              Signature Packages
                            </div>
                            <p className="text-[11px] text-[#E5D3BF]/70 leading-relaxed font-light">
                              Pre-bridal rejuvenation and curated beauty packages.
                            </p>
                          </Link>
                          <Link
                            to="/book"
                            className="p-3 rounded-xl bg-gradient-to-br from-[#B8955A]/20 to-transparent hover:bg-white/10 transition-all border border-[#D4B87A]/35 group"
                          >
                            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1 group-hover:text-[#D4B87A] transition-colors">
                              Book Online <ChevronRight className="w-3 h-3 text-[#D4B87A]" />
                            </div>
                            <p className="text-[11px] text-[#E5D3BF]/80 leading-relaxed font-light">
                              Real-time reservation with reserved time slots.
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.14em] font-medium transition-all ${isCurrentActive
                            ? "text-[#D4B87A] bg-white/[0.08] shadow-[inset_0_0_12px_rgba(212,184,122,0.15)] border border-[#D4B87A]/20"
                            : "text-[#E5D3BF]/75 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Actions Cluster (Direct Call, Book Appointment, and GSAP Staggered Menu) */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Quick Call Icon (Desktop) */}
          <a
            href={PHONE_LINKS.primary}
            className="hidden lg:flex p-2 rounded-full text-[#E5D3BF]/80 hover:text-[#D4B87A] hover:bg-white/5 transition-colors"
            title="Call Salon: 97906 90628"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* Book Appointment CTA (Desktop & Tablet) */}
          <Button
            asChild
            className="hidden sm:inline-flex bg-gradient-to-r from-[#B8955A] via-[#C9A96A] to-[#B8955A] hover:brightness-110 text-[#141210] font-semibold text-xs tracking-[0.14em] uppercase px-4 sm:px-5 py-2 rounded-full shadow-[0_4px_18px_rgba(212,184,122,0.3)] transition-all border border-[#D4B87A]/40"
          >
            <Link to="/book" className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#141210]" />
              <span>Book Appointment</span>
            </Link>
          </Button>

          {/* Compact Book Button (Mobile Only) */}
          <Button
            asChild
            size="sm"
            className="sm:hidden bg-gradient-to-r from-[#B8955A] to-[#D4B87A] text-[#141210] font-semibold text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md shadow-[#D4B87A]/20"
          >
            <Link to="/book">Book</Link>
          </Button>

          {/* Single GSAP Staggered Menu Instance (Serves Both Desktop & Mobile) */}
          <StaggeredMenu
            items={staggeredMenuItems}
            socialItems={staggeredSocialItems}
            colors={["#B8955A", "#2A241E", "#141210"]}
            accentColor="#D4B87A"
            menuButtonColor="#D4B87A"
            openMenuButtonColor="#FFFFFF"
            logoUrl="/logo.png"
            displayItemNumbering={true}
            displaySocials={true}
          />
        </div>
      </header>
    </div>
  );
}
