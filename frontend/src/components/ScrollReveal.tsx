import React from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.1, // Luxurious slow functioning reveal
  distance = 36,
  className = '',
  threshold = 0.15,
  once = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance, filter: 'blur(4px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance, filter: 'blur(4px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
          visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0, filter: 'blur(8px)' },
          visible: { opacity: 1, filter: 'blur(0px)' },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1], // Couture slow ease-out
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
