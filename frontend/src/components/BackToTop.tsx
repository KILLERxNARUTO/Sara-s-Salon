import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
      }`}
      style={{
        background: `conic-gradient(#B8955A ${scrollProgress * 3.6}deg, rgba(25,23,21,0.9) ${scrollProgress * 3.6}deg)`,
      }}
      title="Back to Top"
      aria-label="Scroll to top"
    >
      <span className="w-10 h-10 rounded-full bg-[#191715] flex items-center justify-center group-hover:bg-[#B8955A] transition-colors duration-300">
        <ChevronUp className="w-5 h-5 text-[#D4B87A] group-hover:text-white transition-colors" />
      </span>
    </button>
  );
};

export default BackToTop;
