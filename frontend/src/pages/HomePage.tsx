import React from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { TrustSection } from '@/sections/TrustSection';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { SignatureServicesSection } from '@/sections/SignatureServicesSection';
import { BridalExperienceSection } from '@/sections/BridalExperienceSection';
import { ExperienceFinderSection } from '@/sections/ExperienceFinderSection';
import { AboutPreviewSection } from '@/sections/AboutPreviewSection';
import { PackagesPreviewSection } from '@/sections/PackagesPreviewSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { InstagramSection } from '@/sections/InstagramSection';
import { LocationSection } from '@/sections/LocationSection';
import { BookingCTASection } from '@/sections/BookingCTASection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BackToTop } from '@/components/BackToTop';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section — Full Animation Built-in */}
      <HeroSection />

      {/* 2. Trust & Experience Stats */}
      <ScrollReveal direction="up" delay={100}>
        <TrustSection />
      </ScrollReveal>

      {/* Infinite Moving Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. Signature Service Categories + Offers */}
      <ScrollReveal direction="up" delay={100}>
        <SignatureServicesSection />
      </ScrollReveal>

      {/* 4. Bridal Transformation Experience */}
      <ScrollReveal direction="left" delay={150}>
        <BridalExperienceSection />
      </ScrollReveal>

      {/* 5. Interactive Experience Finder */}
      <ScrollReveal direction="up" delay={100}>
        <ExperienceFinderSection />
      </ScrollReveal>

      {/* 6. About Sara's Story */}
      <ScrollReveal direction="right" delay={150}>
        <AboutPreviewSection />
      </ScrollReveal>

      {/* 7. Bridal Packages Preview */}
      <ScrollReveal direction="up" delay={100}>
        <PackagesPreviewSection />
      </ScrollReveal>

      {/* 8. Client Testimonials */}
      <ScrollReveal direction="up" delay={100}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* 9. Instagram Social Stream */}
      <ScrollReveal direction="fade" delay={200}>
        <InstagramSection />
      </ScrollReveal>

      {/* 10. Location & Studio Address */}
      <ScrollReveal direction="up" delay={100}>
        <LocationSection />
      </ScrollReveal>

      {/* 11. Final Booking Call to Action */}
      <ScrollReveal direction="scale" delay={100}>
        <BookingCTASection />
      </ScrollReveal>

      {/* Back to Top Button with Scroll Progress */}
      <BackToTop />
    </div>
  );
};
