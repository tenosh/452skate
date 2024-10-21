'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface MagneticLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function MagneticLink({ href, className = '', children }: MagneticLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const magneticPull = isHovered ? 0.1 : 0;
      const maxDistance = 5;

      const moveX = Math.min(Math.max(deltaX * magneticPull, -maxDistance), maxDistance);
      const moveY = Math.min(Math.max(deltaY * magneticPull, -maxDistance), maxDistance);

      x.set(moveX);
      y.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, x, y]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        className={`relative inline-block overflow-hidden rounded-sm bg-f-orange p-3 font-serif text-base uppercase text-white focus:outline-none focus:ring-2 focus:ring-f-green ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Ver lo nuevo"
      >
        {children}
      </Link>
    </motion.div>
  );
}
