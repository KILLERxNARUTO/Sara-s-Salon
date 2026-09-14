import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Heart, Award, Sparkles, Star } from 'lucide-react';

// Animated Count-Up Number Component
const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string; duration?: number }> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, target, duration]);

  return (
    <span ref={counterRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const TrustSection: React.FC = () => {
  const stats = [
    {
      icon: Award,
      target: 10,
      suffix: '+',
      label: 'Years of Experience',
      subtext: 'Mastering bridal and salon care since 2014'
    },
    {
      icon: Heart,
      target: 1000,
      suffix: '+',
      label: 'Happy Clients',
      subtext: 'Cherished guests across Guduvanchery'
    },
    {
      icon: Sparkles,
      target: 500,
      suffix: '+',
      label: 'Bridal Makeovers',
      subtext: 'Muhurtham, reception & engagement'
    },
    {
      icon: ShieldCheck,
      target: 100,
      suffix: '%',
      label: 'Ladies & Kids Only',
      subtext: 'Private, female-only sanctuary'
    },
  ];

  return (
    <section className="bg-[#141210] text-[#F8F3ED] py-14 md:py-20 border-y border-[#B8955A]/20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-radial from-[#B8955A]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#B8955A]/50 hover:bg-[#B8955A]/10 transition-all duration-500 group shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#B8955A]/15 border border-[#B8955A]/30 flex items-center justify-center text-[#D4B87A] mb-4 group-hover:scale-110 group-hover:bg-[#B8955A] group-hover:text-white transition-all duration-300 shadow-md">
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Running Number Counter */}
                <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-[#D4B87A] mb-2 tracking-tight transition-colors">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>

                <span className="text-xs uppercase tracking-[0.18em] text-[#E5D3BF] font-semibold mb-1">
                  {stat.label}
                </span>

                <span className="text-[11px] text-[#E5D3BF]/60 font-light hidden sm:block">
                  {stat.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
