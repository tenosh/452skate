'use client';

import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface GridItem {
  title: string;
  alt: string;
  href: string;
  imageUrl: string;
}

interface ScrollableImageGridProps {
  items: GridItem[];
}

export default function ScrollableImageGrid({ items }: ScrollableImageGridProps) {
  return (
    <div className="overscroll-behavior-x-contain relative w-full snap-x snap-mandatory scroll-pl-6 overflow-x-auto scroll-smooth">
      <div className="grid grid-cols-[repeat(3,74vw)] md:grid-cols-[repeat(3,36vw)] lg:grid-cols-3">
        {items.map((item, index) => {
          // Create individual controls for each item
          const controls = useAnimationControls();

          return (
            <div key={index} className="relative snap-start snap-always">
              <Link
                href={item.href}
                className="group block overflow-hidden"
                onMouseEnter={() => controls.start({ scaleX: 1 })}
                onMouseLeave={() => controls.start({ scaleX: 0 })}
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    className="object-cover object-center brightness-50 filter transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 z-10">
                    <h3 className="text-xl font-medium uppercase text-white md:text-3xl">
                      {item.title}
                    </h3>
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-white"
                      initial={{ scaleX: 0 }}
                      animate={controls}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
