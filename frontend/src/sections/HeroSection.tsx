import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';

// Staggered word animation component
const AnimatedWord: React.FC<{ word: string; delay: number; isVisible: boolean }> = ({
  word,
  delay,
  isVisible,
}) => (
  <span
    className="inline-block overflow-hidden"
    style={{ perspective: '600px' }}
  >
    <span
      className="inline-block transition-all ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0) rotateX(0deg)'
          : 'translateY(100%) rotateX(-45deg)',
        transitionDuration: '800ms',
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {word}
    </span>
  </span>
);

// Typewriter cursor animation for tagline
const TypewriterText: React.FC<{ texts: string[]; speed?: number }> = ({
  texts,
  speed = 80,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = texts[currentIndex];
    const typingSpeed = isDeleting ? speed / 2 : speed;

    if (!isDeleting && currentText === text) {
      setTimeout(() => setIsDeleting(true), 2200);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, texts, speed]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[#D4B87A]">
      {currentText}
      <span
        className="inline-block w-[2px] h-[1em] bg-[#D4B87A] ml-0.5 align-middle"
        style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 100ms' }}
      />
    </span>
  );
};

export const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const headlineWords = ['Where', 'Elegance', 'Meets'];
  const typewriterTexts = [
    'Perfection.',
    'Confidence.',
    'Radiance.',
    'Your Story.',
  ];

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center border-b border-[#E5D3BF]/60"
      onMouseMove={handleMouseMove}
    >
      {/* Full Background Image with ambient zoom + parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/parlour_interior_main.jpg"
          alt="Sara's Beauty & Bridal Studio Interior"
          className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
          style={{
            transform: isLoaded
              ? `scale(1.02) translate(${(mousePos.x - 50) * -0.02}%, ${(mousePos.y - 50) * -0.02}%)`
              : 'scale(1.1)',
          }}
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(25,23,21,0.92) 0%, rgba(25,23,21,0.82) 35%, rgba(25,23,21,0.55) 65%, rgba(25,23,21,0.3) 100%)',
          }}
        />
        {/* Warm ambient accent glow that follows mouse */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-[1.5s]"
          style={{
            background: `radial-gradient(ellipse 600px 400px at ${mousePos.x}% ${mousePos.y}%, rgba(184,149,90,0.15) 0%, transparent 60%)`,
          }}
        />
        {/* Animated floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4B87A]/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `float ${4 + i * 0.8}s ease-in-out infinite ${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Top Pill Logo Badge */}
          <div
            className={`transition-all duration-700 delay-100 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Logo layout="pill" variant="light" />
          </div>

          {/* Main Headline with Staggered Word-by-Word Entrance */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-white font-normal leading-[1.12] tracking-tight mt-8">
            <span className="flex flex-wrap gap-x-3 sm:gap-x-4">
              {headlineWords.map((word, i) => (
                <AnimatedWord
                  key={word}
                  word={word}
                  delay={300 + i * 180}
                  isVisible={isLoaded}
                />
              ))}
            </span>
            <span className="block mt-1">
              <span
                className="italic font-normal bg-gradient-to-r from-[#D4B87A] via-[#EFE3D5] to-[#B8955A] bg-clip-text text-transparent drop-shadow-sm inline-block transition-all duration-700"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: '900ms',
                }}
              >
                <TypewriterText texts={typewriterTexts} speed={90} />
              </span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className={`text-base sm:text-lg md:text-xl text-[#E5D3BF]/85 font-light max-w-xl leading-relaxed mt-6 transition-all duration-700 delay-[1100ms] transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Experience handcrafted bridal transformations, advanced skincare,
            expert hair design, and restorative self-care designed exclusively
            for ladies & kids.
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-8 transition-all duration-700 delay-[1300ms] transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Button
              href="/book"
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-xl group"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Book An Appointment
              </span>
            </Button>

            <Button
              href="/bridal"
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto !border-[#E5D3BF]/40 !text-[#E5D3BF] hover:!bg-[#E5D3BF]/10"
            >
              Explore Bridal Artistry
            </Button>
          </div>

          {/* Quick Micro-Highlights with animated counters */}
          <div
            className={`grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/15 max-w-lg transition-all duration-700 delay-[1500ms] transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="hover:scale-110 transition-all duration-300 cursor-default group">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4B87A] group-hover:text-white transition-colors">
                100%
              </p>
              <p className="text-xs text-[#E5D3BF]/65 font-medium uppercase tracking-wider group-hover:text-[#D4B87A] transition-colors">
                Ladies & Kids
              </p>
            </div>
            <div className="hover:scale-110 transition-all duration-300 cursor-default group">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4B87A] group-hover:text-white transition-colors">
                500+
              </p>
              <p className="text-xs text-[#E5D3BF]/65 font-medium uppercase tracking-wider group-hover:text-[#D4B87A] transition-colors">
                Bridal Makeovers
              </p>
            </div>
            <div className="hover:scale-110 transition-all duration-300 cursor-default group">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4B87A] group-hover:text-white transition-colors">
                4.9★
              </p>
              <p className="text-xs text-[#E5D3BF]/65 font-medium uppercase tracking-wider group-hover:text-[#D4B87A] transition-colors">
                Client Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-700 delay-[1800ms] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5D3BF]/50 font-medium">
          Scroll to Explore
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#E5D3BF]/30 flex items-start justify-center p-1">
          <div
            className="w-1 h-2 bg-[#D4B87A] rounded-full"
            style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
};
