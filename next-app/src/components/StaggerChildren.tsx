'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  once?: boolean;
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

export const childVariants = (y: number) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
});

export default function StaggerChildren({
  children,
  className = '',
  stagger = 0.1,
  y = 30,
  once = false,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: '0px 0px -40px 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', y = 30 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <motion.div className={className} variants={childVariants(y)}>
      {children}
    </motion.div>
  );
}
