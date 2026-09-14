import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical' | 'pill';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
  className = '',
}) => {
  const isDark = variant === 'dark';

  // --- PILL BADGE VARIANT ---
  if (layout === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
          isDark
            ? 'bg-[#191715] border-[#B8955A]/50 text-[#D4B87A]'
            : 'bg-[#EFE3D5] border-[#B8955A]/40 text-[#886835]'
        } ${className}`}
      >
        <div className="h-6 w-auto flex-shrink-0">
          <img
            src="/logo.png"
            alt="Sara's Emblem"
            className="h-full w-auto object-contain rounded"
          />
        </div>
        <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
          Sara's Makeover Artistry
        </span>
      </div>
    );
  }

  // --- VERTICAL FULL IMAGE STACKED VARIANT ---
  if (layout === 'vertical') {
    const imgHeight = size === 'sm' ? 'h-12' : size === 'lg' ? 'h-24' : 'h-16 md:h-20';
    return (
      <Link to="/" className={`flex flex-col items-center text-center group ${className}`}>
        {/* Full Uncropped Crown & Flourish Logo Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#D4B87A]/40 bg-[#191715] p-1 transition-transform duration-300 group-hover:scale-105">
          <img
            src="/logo.png"
            alt="Sara's Makeover Artistry Full Logo"
            className={`${imgHeight} w-auto object-contain rounded-lg`}
          />
        </div>
        <div className="mt-3 flex flex-col items-center">
          <span className={`font-sans font-bold tracking-[0.25em] uppercase text-xs md:text-sm ${isDark ? 'text-[#191715]' : 'text-[#D4B87A]'}`}>
            Sara's Makeover Artistry
          </span>
          {showSubtitle && (
            <span className={`font-sans text-[10px] tracking-[0.2em] uppercase mt-1 ${isDark ? 'text-[#886835]' : 'text-[#E5D3BF]/70'}`}>
              Beauty & Bridal Studio
            </span>
          )}
        </div>
      </Link>
    );
  }

  // --- HORIZONTAL HEADER NAVBAR VARIANT ---
  const imgHeight = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10 md:h-12';
  const sizeClasses = {
    sm: {
      title: 'text-base',
      subtitle: 'text-[8px] tracking-widest',
    },
    md: {
      title: 'text-lg md:text-xl',
      subtitle: 'text-[9px] tracking-[0.2em]',
    },
    lg: {
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-xs tracking-[0.25em]',
    },
  }[size];

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group text-left ${className}`}>
      {/* Full Uncropped Crown Logo Emblem */}
      <div className="relative rounded-lg overflow-hidden shadow-md border border-[#D4B87A]/40 bg-[#191715] p-0.5 transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
        <img
          src="/logo.png"
          alt="Sara's Makeover Artistry Logo"
          className={`${imgHeight} w-auto object-contain rounded`}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-semibold leading-none transition-colors ${
            sizeClasses.title
          } ${isDark ? 'text-[#191715]' : 'text-white'}`}
        >
          Sara's
        </span>
        {showSubtitle && (
          <span
            className={`font-sans uppercase font-medium mt-1 ${
              sizeClasses.subtitle
            } ${isDark ? 'text-[#A07D45]' : 'text-[#D4B87A]'}`}
          >
            Makeover Artistry
          </span>
        )}
      </div>
    </Link>
  );
};


