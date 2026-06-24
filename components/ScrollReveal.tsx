'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

const getVariants = (direction: string) => {
  switch (direction) {
    case 'up': return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
    case 'down': return { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } };
    case 'left': return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
    case 'right': return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
    case 'none': return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    default: return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
  }
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={getVariants(direction)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
