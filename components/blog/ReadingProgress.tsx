'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 z-[99999] origin-left shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      style={{ scaleX }}
    />
  );
};
