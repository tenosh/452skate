'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CartModal from 'components/cart/modal';
import Logo from 'components/layout/logo/logo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';

interface NavbarItemsProps {
  menu: Menu[];
}

export default function NavbarItems({ menu }: NavbarItemsProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="font-oswald fixed left-0 right-0 top-0 z-50 bg-transparent transition-colors duration-200"
    >
      <nav className="container relative flex min-h-[74px] items-center justify-between py-2">
        {/* mobile */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        {/* desktop */}
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            prefetch={true}
            className="flex w-full items-center justify-center md:w-auto"
          >
            <Logo size="lg" />
          </Link>
          <div className="hidden py-2 md:flex">
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link href={item.path} prefetch={true} className="text-452-blue-light">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="flex items-center">
              <MagnifyingGlassIcon className="text-452-blue-light h-7 w-7 transition-all ease-in-out hover:scale-110" />
            </div>
            <CartModal />
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
