'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { AdjustmentsHorizontalIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import CloseCart from 'components/cart/close-cart';
import AnimatedUnderlineLink from 'components/ctas/underline';
import { menuFilters } from 'lib/constants';
import { Collection } from 'lib/shopify/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';

export default function CollectionsModal({ collections }: { collections: Collection[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsCollapsed, setCollectionsCollapsed] = useState(false);
  const [collapsedFilters, setCollapsedFilters] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.get(filterType)?.split(',') || [];
    const urlValue = filterType === 'medida' ? value.replace(/"/g, '') : value;

    if (currentFilters.includes(urlValue)) {
      const newFilters = currentFilters.filter((filter) => filter !== urlValue);
      if (newFilters.length > 0) {
        params.set(filterType, newFilters.join(','));
      } else {
        params.delete(filterType);
      }
    } else {
      params.set(filterType, [...currentFilters, urlValue].join(','));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const isFilterSelected = (filterType: string, value: string) => {
    const currentFilters = searchParams.get(filterType)?.split(',') || [];
    const urlValue = filterType === 'medida' ? value.replace(/"/g, '') : value;
    return currentFilters.includes(urlValue);
  };

  const getRelevantFilters = () => {
    const pathSegments = pathname.split('/');
    const category = pathSegments[pathSegments.length - 1];

    if (pathname === '/search') {
      const mergedFilters: Record<string, string[]> = {};

      Object.values(menuFilters).forEach((categoryFilters) => {
        Object.entries(categoryFilters).forEach(([filterType, values]) => {
          if (!mergedFilters[filterType]) {
            mergedFilters[filterType] = [];
          }
          mergedFilters[filterType] = [...new Set([...mergedFilters[filterType], ...values])];
        });
      });

      return mergedFilters;
    }

    return menuFilters[category as keyof typeof menuFilters] || {};
  };

  const toggleFilter = (filterType: string) => {
    setCollapsedFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

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
              <div className="scrollbar-hide mt-4 flex flex-col overflow-y-auto">
                <div>
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

                <div className="mt-4 space-y-4">
                  {Object.entries(getRelevantFilters()).map(([filterType, values]) => (
                    <div key={filterType}>
                      <button
                        onClick={() => toggleFilter(filterType)}
                        className="flex w-full items-center justify-between border-b border-452-blue-light py-2"
                      >
                        <h3 className="font-semibold capitalize text-452-blue-light">
                          {filterType}
                        </h3>
                        <ChevronUpIcon
                          className={clsx(
                            'h-5 w-5 text-452-blue-light transition-transform duration-200',
                            collapsedFilters[filterType] ? 'rotate-180' : ''
                          )}
                        />
                      </button>
                      <div
                        className={clsx(
                          'mt-2 space-y-2 overflow-hidden transition-all duration-200',
                          collapsedFilters[filterType] ? 'mt-0 h-0' : 'h-auto'
                        )}
                      >
                        {values.map((value, index) => (
                          <label
                            key={value}
                            className={clsx(
                              'group flex items-center gap-2 px-2',
                              index === 0 && 'pt-1'
                            )}
                          >
                            <div className="relative flex h-5 w-5 items-center justify-center">
                              <input
                                type="checkbox"
                                checked={isFilterSelected(filterType, value)}
                                onChange={() => handleFilterChange(filterType, value)}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-452-blue-light bg-white transition-all checked:border-452-blue-light checked:bg-452-blue-light hover:border-452-blue-dark focus:outline-none focus:ring-2 focus:ring-452-blue-light focus:ring-offset-2"
                              />
                              <svg
                                className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-sm text-452-blue-light group-hover:text-452-blue-dark">
                              {value}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
