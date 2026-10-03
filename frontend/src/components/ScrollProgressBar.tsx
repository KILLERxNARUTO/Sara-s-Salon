import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#B8955A] via-[#D4B87A] to-[#EFE3D5] origin-left z-50 shadow-[0_0_10px_rgba(212,184,122,0.8)]"
      style={{ scaleX }}
    />
  );
};
