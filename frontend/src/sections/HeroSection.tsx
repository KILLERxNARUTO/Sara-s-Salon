import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/Button';

// Background scenes for the hero showcase
const HERO_SCENES = [
  {
    id: 'bridal',
    title: 'Bridal Couture & Royal Makeovers',
    image: '/images/luxury_bridal_editorial.jpg',
    tag: 'Haute Bridal Artistry',
    subtitle: 'Handcrafted South Indian and contemporary bridal transformations.',
  },
  {
    id: 'sanctuary',
    title: 'Private Boutique Beauty Sanctuary',
    image: '/images/luxury_salon_sanctuary.jpg',
    tag: 'Sanctuary Atelier',
    subtitle: 'Tranquil luxury salon suite exclusively dedicated for ladies and kids.',
  },
];

export const HeroSection: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % HERO_SCENES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const currentScene = HERO_SCENES[activeSceneIndex];

  // Typewriter animation state for flagship headline
  const LINE_1 = "Where Elegance";
  const LINE_2 = "Becomes Artistry.";

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [typingStage, setTypingStage] = useState<'line1' | 'line2' | 'pause' | 'deletingLine2'>('line1');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (typingStage === 'line1') {
      if (line1.length < LINE_1.length) {
        timeout = setTimeout(() => {
          setLine1(LINE_1.slice(0, line1.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => {
          setTypingStage('line2');
        }, 220);
      }
    } else if (typingStage === 'line2') {
      if (line2.length < LINE_2.length) {
        timeout = setTimeout(() => {
          setLine2(LINE_2.slice(0, line2.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => {
          setTypingStage('pause');
        }, 300);
      }
    } else if (typingStage === 'pause') {
      // Hold the completed headline for 6 seconds before softly refreshing line 2
      timeout = setTimeout(() => {
        setTypingStage('deletingLine2');
      }, 6000);
    } else if (typingStage === 'deletingLine2') {
      if (line2.length > 0) {
        timeout = setTimeout(() => {
          setLine2((prev) => prev.slice(0, -1));
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setTypingStage('line2');
        }, 350);
      }
    }

    return () => clearTimeout(timeout);
  }, [line1, line2, typingStage]);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#141210] text-[#F8F3ED] border-b border-[#B8955A]/20"
      onMouseMove={handleMouseMove}
    >
      {/* Background Layer with Ken-Burns Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{
              x: mousePos.x * -0.25,
              y: mousePos.y * -0.25,
            }}
          >
            <img
              src={currentScene.image}
              alt={currentScene.title}
              className="w-full h-full object-cover object-center brightness-[0.76]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Couture Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/80 to-[#141210]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/60" />

        {/* Ambient Golden Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
          animate={{
            background: `radial-gradient(circle 700px at ${50 + mousePos.x * 1.5}% ${50 + mousePos.y * 1.5}%, rgba(212,184,122,0.25) 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Main Foreground Container */}
      <div className="container-custom relative z-10 py-24 md:py-32 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Simple, Clean, Professional Typography */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#D4B87A]">
                {currentScene.tag}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs text-[#E5D3BF]/70 tracking-wider uppercase font-light">
                Guduvanchery Atelier
              </span>
            </motion.div>

            {/* Main Clean Editorial Headline with Typing Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-medium leading-[1.08] tracking-tight text-white min-h-[2.3em]"
            >
              <span className="inline-block">
                {line1}
                {typingStage === 'line1' && (
                  <span className="inline-block w-[3px] h-[0.82em] ml-1.5 bg-[#D4B87A] align-baseline animate-pulse shadow-[0_0_10px_rgba(212,184,122,0.9)]" />
                )}
              </span>{' '}
              <span className="block mt-1 text-[#D4B87A] font-light min-h-[1.15em]">
                {line2}
                {typingStage !== 'line1' && (
                  <span className="inline-block w-[3px] h-[0.82em] ml-1.5 bg-[#D4B87A] align-baseline animate-pulse shadow-[0_0_10px_rgba(212,184,122,0.9)]" />
                )}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[#E5D3BF]/85 font-light leading-relaxed mt-6 max-w-2xl"
            >
              Guduvanchery's premier haute beauty atelier. Indulge in bespoke South Indian bridal couture,
              high-performance hydra facials, hair transformation rituals, and genuine pampering tailored
              exclusively for ladies and kids.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8"
            >
              <Button
                href="/book"
                variant="primary"
                size="lg"
                icon={<Calendar className="w-4 h-4" />}
                className="!px-8 !py-4 shadow-xl"
              >
                Reserve Your Appointment
              </Button>

              <Button
                href="/bridal"
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="!border-white/30 !text-[#EFE3D5] hover:!bg-white/10 !px-7 !py-4"
              >
                Explore Bridal Couture
              </Button>
            </motion.div>

            {/* Quick Metrics Bar — Open Line Flow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/15 max-w-lg"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-light text-[#D4B87A]">500+</p>
                <p className="text-xs uppercase tracking-wider text-[#E5D3BF]/60 mt-1">Brides Crowned</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-light text-[#D4B87A]">100%</p>
                <p className="text-xs uppercase tracking-wider text-[#E5D3BF]/60 mt-1">Ladies & Kids</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-light text-[#D4B87A]">10+ Yrs</p>
                <p className="text-xs uppercase tracking-wider text-[#E5D3BF]/60 mt-1">Atelier Mastery</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Open Editorial Highlights — Zero Boxes */}
          <div className="lg:col-span-4 space-y-8 pt-4 lg:pt-0">
            {/* Minimalist Scene Controller */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4B87A] block font-medium">
                Atelier Showcase • 0{activeSceneIndex + 1}
              </span>
              <div className="flex gap-4">
                {HERO_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`text-xs uppercase tracking-wider transition-all duration-300 pb-1 cursor-pointer ${
                      activeSceneIndex === idx
                        ? 'text-white border-b-2 border-[#D4B87A] font-semibold'
                        : 'text-[#E5D3BF]/40 hover:text-white'
                    }`}
                  >
                    {idx === 0 ? 'Bridal Couture' : 'Sanctuary Floor'}
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Highlight 1 — Open Typographic Presentation */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.18em] text-[#D4B87A] font-medium block">
                Hospital Grade Hygiene
              </span>
              <p className="text-xs text-[#E5D3BF]/80 font-light leading-relaxed">
                Sterilized single-use instruments, sealed branded cosmetics, and private treatment cabins.
              </p>
            </div>

            {/* Editorial Highlight 2 — Open Typographic Presentation */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.18em] text-[#D4B87A] font-medium block">
                Dedicated Bridal Dressing Lounge
              </span>
              <p className="text-xs text-[#E5D3BF]/80 font-light leading-relaxed">
                Full-day seclusion for brides, pre-pleated saree draping, and entourage coordination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
