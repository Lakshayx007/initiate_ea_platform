'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1500, // Pass in milliseconds
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    // Set initial text before animation starts
    node.textContent = `${prefix}${from.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

    if (isInView) {
      const controls = animate(from, to, {
        duration: duration / 1000, // framer-motion uses seconds
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = `${prefix}${value.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        },
      });

      return () => controls.stop();
    }
  }, [from, to, duration, prefix, suffix, decimals, isInView]);

  return <span ref={nodeRef} className="tabular-nums" />;
}
