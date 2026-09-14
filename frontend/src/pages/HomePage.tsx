import React from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { TrustSection } from '@/sections/TrustSection';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { SignatureServicesSection } from '@/sections/SignatureServicesSection';
import { BridalExperienceSection } from '@/sections/BridalExperienceSection';
import { GalleryPreviewSection } from '@/sections/GalleryPreviewSection';
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

      {/* 5. Transformation Gallery Preview */}
      <ScrollReveal direction="scale" delay={100}>
        <GalleryPreviewSection />
      </ScrollReveal>

      {/* 6. Interactive Experience Finder */}
      <ScrollReveal direction="up" delay={100}>
        <ExperienceFinderSection />
      </ScrollReveal>

      {/* 7. About Sara's Story */}
      <ScrollReveal direction="right" delay={150}>
        <AboutPreviewSection />
      </ScrollReveal>

      {/* 8. Bridal Packages Preview */}
      <ScrollReveal direction="up" delay={100}>
        <PackagesPreviewSection />
      </ScrollReveal>

      {/* 9. Client Testimonials */}
      <ScrollReveal direction="up" delay={100}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* 10. Instagram Social Stream */}
      <ScrollReveal direction="fade" delay={200}>
        <InstagramSection />
      </ScrollReveal>

      {/* 11. Location & Studio Address */}
      <ScrollReveal direction="up" delay={100}>
        <LocationSection />
      </ScrollReveal>

      {/* 12. Final Booking Call to Action */}
      <ScrollReveal direction="scale" delay={100}>
        <BookingCTASection />
      </ScrollReveal>

      {/* Back to Top Button with Scroll Progress */}
      <BackToTop />
    </div>
  );
};
