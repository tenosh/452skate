'use client';

import { motion, useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AnimatedUnderlineLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  initiallyUnderlined?: boolean;
}

export default function AnimatedUnderlineLink({
  href,
  children,
  className = '',
  initiallyUnderlined = true
}: AnimatedUnderlineLinkProps) {
  const controls = useAnimationControls();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => controls.start({ scaleX: initiallyUnderlined ? 0 : 1 })}
      onMouseLeave={() => controls.start({ scaleX: initiallyUnderlined ? 1 : 0 })}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] w-full bg-452-blue-light"
        initial={{ scaleX: initiallyUnderlined ? 1 : 0 }}
        animate={controls}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ originX: 1 }}
      />
    </div>
  );
}
