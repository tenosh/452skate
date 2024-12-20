'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedIconProps {
  icon: React.ReactNode;
  initialColor?: string;
  scrollColor?: string;
}

export default function AnimatedIcon({
  icon,
  initialColor = 'rgb(255, 255, 255)', // white
  scrollColor = 'rgb(73, 136, 189)' // 452-blue-light
}: AnimatedIconProps) {
  const { scrollY } = useScroll();
  const textColor = useTransform(scrollY, [99, 100], [initialColor, scrollColor]);

  return (
    <motion.div style={{ color: textColor }} className="flex items-center">
      <div className="h-6 w-6 hover:scale-110 lg:h-7 lg:w-7">{icon}</div>
    </motion.div>
  );
}
