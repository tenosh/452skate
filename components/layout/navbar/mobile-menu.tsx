'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Bars4Icon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AnimatedIcon from 'components/icons/color-change-icon';
import { MenuWithSubItems } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

export default function MobileMenu({ menu }: { menu: MenuWithSubItems[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  // Add state for tracking selected menu item
  const [selectedMenu, setSelectedMenu] = useState<MenuWithSubItems | null>(null);
  const openMobileMenu = () => {
    setSelectedMenu(null);
    setIsOpen(true);
  };
  const closeMobileMenu = () => {
    setIsOpen(false);
    setSelectedMenu(null);
  };

  // effects
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Abrir el menu movil"
        className="flex h-8 items-center justify-center text-white transition-colors md:hidden"
      >
        <AnimatedIcon icon={<Bars4Icon className="h-full w-full transition-all ease-in-out" />} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <DialogPanel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6">
              <div className="p-4">
                <button
                  className="mb-4 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-452-blue-light text-452-blue-light transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menu"
                >
                  <XMarkIcon className="h-6" />
                </button>
                <div>
                  {menu.length ? (
                    <ul className="flex w-full flex-col">
                      {menu.map((item: MenuWithSubItems) => (
                        <li
                          className="flex flex-row justify-around py-2 text-xl text-452-blue-light transition-colors"
                          key={item.title}
                        >
                          {item.subItems ? (
                            <button
                              className="flex w-full flex-row justify-between"
                              onClick={() => setSelectedMenu(item)}
                            >
                              <span>{item.title}</span>
                              <ChevronRightIcon className="h-6 w-6" />
                            </button>
                          ) : (
                            <Link href={item.path} className="flex w-full flex-row justify-between">
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {/* Submenu Panel */}
                <div
                  className={`absolute inset-0 h-svh w-svw p-4 ${selectedMenu ? 'translate-x-0' : 'translate-x-[100%]'} bg-white transition-transform duration-300`}
                >
                  {selectedMenu && (
                    <>
                      {/* header */}
                      <div className="p-4">
                        <button
                          className="mb-4 flex items-center text-452-blue-light"
                          onClick={() => setSelectedMenu(null)}
                        >
                          <ChevronRightIcon className="h-6 w-6 rotate-180" />
                          <span className="ml-2">Volver a menú</span>
                        </button>
                        <h2 className="text-center font-oswald text-xl font-bold uppercase text-452-blue-light">
                          {selectedMenu.title}
                        </h2>
                      </div>
                      {/* Scrollable content */}
                      <div className="overflow-y-auto px-4 pb-4">
                        <Link
                          href={`/search/${selectedMenu.title.toLocaleLowerCase()}`}
                          className="mb-4 inline-block py-1 text-xl text-452-blue-light transition-colors"
                        >
                          Ver todo en {selectedMenu.title.toLocaleLowerCase()}
                        </Link>
                        {Object.entries(selectedMenu.subItems || {}).map(([category, items]) => (
                          <div key={category} className="mb-4">
                            <h3 className="mb-2 font-oswald text-lg font-semibold uppercase text-452-blue-light">
                              comprar por {category}
                            </h3>
                            <ul className="flex w-full flex-col">
                              {items.map((item: string) => (
                                <li
                                  key={item}
                                  className="py-1 text-xl text-452-blue-light transition-colors"
                                >
                                  <Link
                                    href={`/search/${selectedMenu.title.toLocaleLowerCase()}?${category}=${item.replace('"', '').toLocaleLowerCase()}`}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
