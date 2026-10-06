import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { generateBridalInquiryLink } from '@/utils/whatsapp';

const BRIDAL_STEPS = [
  {
    step: '01',
    title: 'Consultation & Look Curation',
    tagline: 'Bridal Aura Mapping',
    desc: 'In-depth consultation covering your bridal attire, jewellery tones, muhurtham timing, and personal aesthetic to craft bespoke makeover blueprints.',
    highlights: ['Saree and Jewellery Color Matching', 'Skin Preparation Roadmap', 'Custom Hair Ornamentation Plan'],
    image: '/images/luxury_bridal_editorial.jpg',
  },
  {
    step: '02',
    title: 'Aesthetic Skin Preparation',
    tagline: 'Luminous Glow Rituals',
    desc: 'Multi-week pre-bridal skin therapy featuring luxury hydra-infusions, gold-leaf peptide serums, and intensive detanning for natural glass skin.',
    highlights: ['O3+ Diamond Glow Therapy', 'Under-eye Brightening Infusion', 'Collagen Boost Rejuvenation'],
    image: '/images/luxury_skincare_facial.jpg',
  },
  {
    step: '03',
    title: 'Royal Mehendi Artistry',
    tagline: 'Intricate Peacock & Jaal Henna',
    desc: 'Handcrafted bridal henna crafted with organic, dark-staining herbal mehendi paste, customized with groom initials and traditional South Indian motifs.',
    highlights: ['Full Hands and Feet Bridal Layout', 'Organic Long-Lasting Natural Dye', 'Arabic & Rajasthani Fusion'],
    image: '/images/luxury_bridal_mehendi.jpg',
  },
  {
    step: '04',
    title: 'Muhurtham & Reception Makeover',
    tagline: '16-Hour Sweatproof Longevity',
    desc: 'High-definition airbrush and waterproof makeup formulated to withstand warm mandap lighting, humidity, and tears of joy without caking.',
    highlights: ['HD Airbrush Perfection', 'Flawless Saree Draping & Pre-pleating', 'Fresh Jasmine Veni Hair Styling'],
    image: '/images/luxury_bridal_editorial.jpg',
  },
  {
    step: '05',
    title: 'Entourage & Family Styling',
    tagline: 'Complete Wedding Suite',
    desc: 'Coordinated hair, makeup, and saree draping for the mother of the bride, sisters, and bridal entourage in our private luxury lounge.',
    highlights: ['Private Ladies Suite Seclusion', 'Synchronized Schedule Timing', 'Express Touchup Assistance'],
    image: '/images/luxury_salon_sanctuary.jpg',
  },
];

export const BridalExperienceSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const bridalWhatsApp = generateBridalInquiryLink();
  const currentStep = BRIDAL_STEPS[activeStepIndex];

  return (
    <section className="py-24 md:py-32 bg-[#121110] text-[#F8F3ED] relative overflow-hidden border-b border-[#B8955A]/20">
      <div className="container-custom relative z-10">
        <SectionHeading
          subtitle="Sara's Haute Bridal Couture"
          title="The Royal Bridal Transformation Journey"
          description="Every bride carries a royal legacy. We sculpt an unforgettable metamorphosis spanning pre-wedding skincare, intricate mehendi, and flawless 16-hour muhurtham makeup."
          align="center"
          theme="dark"
        />

        {/* Open Horizontal Step Indicator — No Box Containers */}
        <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-6 my-8 border-b border-white/10">
          {BRIDAL_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStepIndex(idx)}
              className="group flex flex-col items-start gap-1 transition-all duration-300 shrink-0 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-mono transition-colors ${
                    activeStepIndex === idx ? 'text-[#D4B87A] font-semibold' : 'text-[#E5D3BF]/40'
                  }`}
                >
                  {step.step}
                </span>
                <span
                  className={`text-xs uppercase tracking-wider transition-colors ${
                    activeStepIndex === idx ? 'text-white font-medium' : 'text-[#E5D3BF]/50 group-hover:text-[#E5D3BF]'
                  }`}
                >
                  {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                </span>
              </div>
              <div
                className={`h-[2px] w-full transition-all duration-500 mt-2 ${
                  activeStepIndex === idx ? 'bg-[#D4B87A]' : 'bg-transparent'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Detailed Showcase Split View — Open Editorial Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
          {/* Left: Interactive Details & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4B87A] font-semibold block">
                  Stage {currentStep.step} • {currentStep.tagline}
                </span>

                <h3 className="text-3xl sm:text-4xl text-white font-normal leading-tight tracking-tight">
                  {currentStep.title}
                </h3>

                <p className="text-base text-[#E5D3BF]/80 font-light leading-relaxed">
                  {currentStep.desc}
                </p>

                {/* Highlights List with Clean Line Bullets */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  {currentStep.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#EFE3D5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4B87A] shrink-0" />
                      <span className="font-light tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                href={bridalWhatsApp}
                isExternal
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Inquire on WhatsApp
              </Button>
              <Button
                href="/bridal"
                variant="outline"
                size="md"
                icon={<Calendar className="w-4 h-4" />}
                className="!border-[#D4B87A]/40 !text-[#EFE3D5] hover:!bg-[#D4B87A]/15"
              >
                View Complete Bridal Menu
              </Button>
            </div>
          </div>

          {/* Right: Clean Editorial Photography Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#191715] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentStep.image}
                  src={currentStep.image}
                  alt={currentStep.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover brightness-[0.9]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-6 right-6 text-white flex items-center justify-between text-xs">
                <span className="font-light text-[#E5D3BF]">{currentStep.title}</span>
                <span className="font-mono text-[#D4B87A] font-semibold">{currentStep.step} / 05</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
