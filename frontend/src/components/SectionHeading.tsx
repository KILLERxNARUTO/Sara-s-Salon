import React from 'react';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignClasses} ${className}`}>
      {subtitle && (
        <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-[#B8955A] mb-3">
          {subtitle}
        </span>
      )}

      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-tight max-w-3xl ${
          isDark ? 'text-white' : 'text-[#191715]'
        }`}
      >
        {title}
      </h2>

      {/* Decorative Accent Line */}
      <div
        className={`w-16 h-[2px] bg-gradient-to-r from-[#B8955A] to-[#D4B87A] my-5 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {description && (
        <p
          className={`text-base md:text-lg max-w-2xl font-light leading-relaxed ${
            isDark ? 'text-[#EFE3D5]/80' : 'text-[#2A2623]/80'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
