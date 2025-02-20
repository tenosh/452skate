'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CartModal from 'components/cart/modal';
import MagneticElement from 'components/ctas/magnetic';
import AnimatedIcon from 'components/icons/color-change-icon';
import Logo from 'components/layout/logo/logo';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { menuFilters } from 'lib/constants';
import { Menu, MenuWithSubItems } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import MobileMenu from './mobile-menu';

interface NavbarItemsProps {
  menu: Menu[];
  skipScrollAnimation?: boolean;
}

function addSubitems(menu: Menu[]): MenuWithSubItems[] {
  return menu.map((item) => {
    const key = item.title.toLowerCase();
    // Find any menuFilter key that contains our search key
    const matchingKey = Object.keys(menuFilters).find((filterKey) =>
      filterKey.toLowerCase().includes(key)
    );

    if (matchingKey) {
      return {
        ...item,
        subItems: menuFilters[matchingKey as keyof typeof menuFilters]
      };
    }
    return item;
  });
}

export default function NavbarItems({ menu, skipScrollAnimation = false }: NavbarItemsProps) {
  const menuWithSubItems = addSubitems(menu);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { scrollY } = useScroll();
  // Move useTransform hooks outside of conditional logic
  const bgTransform = useTransform(
    scrollY,
    [99, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
  );
  const textTransform = useTransform(
    scrollY,
    [99, 100],
    ['rgb(255, 255, 255)', 'rgb(73, 136, 189)']
  );

  // Use the transformed values based on conditions
  const backgroundColor =
    skipScrollAnimation || !isHomePage ? 'rgba(255, 255, 255, 1)' : bgTransform;
  const textColor =
    skipScrollAnimation || !isHomePage
      ? 'rgb(73, 136, 189)' // 452-blue-light
      : textTransform;

  // local helpers
  const handleMouseEnter = (title: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 100); // 1ms delay before closing
    setCloseTimeout(timeout);
  };

  // Add this new handler
  const handleMenuClick = () => {
    setActiveMenu(null);
  };

  // effects
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  return (
    <>
      <AnimatePresence>
        {activeMenu &&
          menuWithSubItems.find((item) => item.title === activeMenu && item.subItems) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              style={{ zIndex: 40 }}
            />
          )}
      </AnimatePresence>
      <motion.div
        style={{ backgroundColor }}
        onMouseLeave={handleMouseLeave}
        className="fixed left-0 right-0 top-0 z-50 bg-transparent font-oswald transition-colors duration-200"
      >
        <nav className="container relative flex min-h-[74px] items-center justify-between py-2">
          {/* mobile */}
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menuWithSubItems} />
            </Suspense>
          </div>
          {/* desktop */}
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              prefetch={true}
              className="flex w-full items-center justify-center md:w-auto"
            >
              <Logo className="-mr-[20px] md:mr-0" size="lg" />
            </Link>
            <div className="hidden py-2 md:flex">
              {menu.length ? (
                <ul className="hidden gap-4 md:flex md:items-center lg:gap-6">
                  {menuWithSubItems.map((item: MenuWithSubItems) => (
                    <li key={item.title} onMouseEnter={() => handleMouseEnter(item.title)}>
                      <motion.div
                        whileHover="hover"
                        initial="initial"
                        animate={
                          activeMenu === item.title || pathname === item.path ? 'hover' : 'initial'
                        }
                        style={{ color: textColor }}
                      >
                        <Link
                          href={item.path}
                          prefetch={true}
                          className="relative inline-block text-base uppercase tracking-normal lg:text-lg lg:tracking-wider"
                          onClick={handleMenuClick}
                        >
                          {item.title}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[2px] origin-center bg-452-blue-light"
                            variants={{
                              initial: { scaleX: 0 },
                              hover: { scaleX: 1 }
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex gap-6 md:gap-8">
              <MagneticElement>
                <AnimatedIcon icon={<MagnifyingGlassIcon className="h-full w-full" />} />
              </MagneticElement>
              <CartModal />
            </div>
          </div>
        </nav>
        {/* desktop submenu */}
        <AnimatePresence>
          {activeMenu &&
            menuWithSubItems.find((item) => item.title === activeMenu && item.subItems) && (
              <motion.div
                onMouseEnter={() => handleMouseEnter(activeMenu)}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.2,
                  height: {
                    duration: 0.3
                  }
                }}
                className="absolute left-0 right-0 top-[74px] z-40 overflow-hidden border-t-2 border-452-blue-light bg-white"
              >
                <motion.div className="container py-10">
                  <AnimatePresence mode="wait">
                    {menuWithSubItems.map(
                      (item: MenuWithSubItems) =>
                        activeMenu === item.title &&
                        item.subItems && (
                          <motion.ul
                            key={item.title}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="items-top flex flex-row justify-center gap-28"
                          >
                            {Object.entries(item.subItems).map(([category, values]) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                              >
                                <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-452-blue-light lg:text-lg">
                                  comprar por {category}
                                </h3>
                                <ul className="flex max-h-[160px] flex-col flex-wrap gap-x-6">
                                  {values.map((value, index) => (
                                    <motion.li
                                      key={value}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        delay: 0.1 + index * 0.03
                                      }}
                                    >
                                      <motion.span whileHover="hover" initial="initial">
                                        <Link
                                          href={`${item.path}?${category}=${value.replace('"', '').toLocaleLowerCase()}`}
                                          className="ml-2 font-chakra text-base tracking-wider text-452-blue-light hover:text-452-blue-dark md:text-lg"
                                          onClick={handleMenuClick}
                                        >
                                          <span className="relative inline-block">
                                            {value}
                                            <motion.div
                                              className="absolute -bottom-0 left-0 right-0 h-[2px] bg-452-blue-dark"
                                              variants={{
                                                initial: { scaleX: 0, transformOrigin: 'left' },
                                                hover: { scaleX: 1, transformOrigin: 'left' }
                                              }}
                                              initial="initial"
                                              whileHover="hover"
                                              animate={
                                                pathname + window.location.search ===
                                                `${item.path}?${category}=${value.replace('"', '').toLocaleLowerCase()}`
                                                  ? 'hover'
                                                  : 'initial'
                                              }
                                              transition={{ duration: 0.3 }}
                                            />
                                          </span>
                                        </Link>
                                      </motion.span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            ))}
                          </motion.ul>
                        )
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
