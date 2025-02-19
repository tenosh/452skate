'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { AdjustmentsHorizontalIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import CloseCart from 'components/cart/close-cart';
import AnimatedUnderlineLink from 'components/ctas/underline';
import { Collection } from 'lib/shopify/types';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function CollectionsModal({ collections }: { collections: Collection[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsCollapsed, setCollectionsCollapsed] = useState(false);
  const pathname = usePathname();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        aria-label="Abrir filtros"
        onClick={openModal}
        className="flex items-center gap-2 text-452-blue-light hover:opacity-80"
      >
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
        <span className="font-oswald text-lg">Filtros</span>
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeModal} className="relative z-50">
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
            <DialogPanel className="fixed bottom-0 left-0 top-0 flex h-full w-full flex-col border-r border-452-blue-light bg-white p-6 backdrop-blur-3xl md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-452-blue-light">Filtros</p>
                <button aria-label="Cerrar filtros" onClick={closeModal}>
                  <CloseCart />
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setCollectionsCollapsed(!collectionsCollapsed)}
                  className="flex w-full items-center justify-between border-b border-452-blue-light py-2"
                >
                  <h3 className="font-semibold text-452-blue-light">Colecciones</h3>
                  <ChevronUpIcon
                    className={clsx(
                      'h-5 w-5 text-452-blue-light transition-transform duration-200',
                      collectionsCollapsed ? 'rotate-180' : ''
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    'mt-2 space-y-2 overflow-hidden transition-all duration-200',
                    collectionsCollapsed ? 'mt-0 h-0' : 'h-auto'
                  )}
                >
                  {collections.map((collection) => {
                    const isActive = pathname === collection.path;
                    return (
                      <div key={collection.handle} className="px-2">
                        {isActive ? (
                          <div className="relative inline-block">
                            <span className="text-sm text-452-blue-light">
                              {collection.title === 'All' ? 'Todo' : collection.title}
                              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-452-blue-light" />
                            </span>
                          </div>
                        ) : (
                          <AnimatedUnderlineLink
                            href={collection.path}
                            className="text-sm text-452-blue-light"
                            initiallyUnderlined={false}
                          >
                            {collection.title === 'All' ? 'Todo' : collection.title}
                          </AnimatedUnderlineLink>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
