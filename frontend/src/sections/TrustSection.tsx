import React, { useState, useEffect, useRef } from 'react';

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

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
      target: 10,
      suffix: '+',
      label: 'Years of Atelier Mastery',
      subtext: 'Bespoke bridal styling and salon care since 2014'
    },
    {
      target: 1000,
      suffix: '+',
      label: 'Client Transformations',
      subtext: 'Cherished guests across Guduvanchery and Chennai'
    },
    {
      target: 500,
      suffix: '+',
      label: 'Bridal Makeovers',
      subtext: 'Muhurtham, reception and engagement ceremonies'
    },
    {
      target: 100,
      suffix: '%',
      label: 'Ladies & Kids Sanctuary',
      subtext: 'Completely private, female-only studio environment'
    },
  ];

  return (
    <section className="bg-[#141210] text-[#F8F3ED] py-16 md:py-20 border-y border-[#B8955A]/20 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Open Editorial Flow — No Boxes, No Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col px-4 md:px-8 text-center sm:text-left ${
                idx !== 0 ? 'lg:border-l lg:border-white/10' : ''
              }`}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-2">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-[#D4B87A] font-medium mb-1.5">
                {stat.label}
              </span>

              <span className="text-xs text-[#E5D3BF]/60 font-light leading-relaxed max-w-xs">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
