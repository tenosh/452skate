'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ListItem } from './filter';

export default function FilterDropdown({ list, title }: { list: ListItem[]; title?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const activeItem = list.find(
      (item) =>
        ('path' in item && pathname === item.path) ||
        ('slug' in item && searchParams.get('sort') === item.slug)
    );
    if (activeItem) {
      setActive(activeItem.title);
    }
  }, [pathname, list, searchParams]);

  return (
    <div className="relative text-452-blue-light" ref={ref}>
      <div className="flex flex-row items-center gap-4">
        <span className="hidden font-oswald text-lg md:block">{title}</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <span className="font-chakra">{active}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDownIcon className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-40 mt-2 w-48 rounded-md border border-452-blue-light bg-white p-2 shadow-lg"
          >
            {list.map((item: ListItem, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  if ('path' in item) {
                    window.location.href = item.path;
                  } else if ('slug' in item) {
                    if (item.slug) {
                      params.set('sort', item.slug);
                    } else {
                      params.delete('sort');
                    }
                    window.location.href = `${pathname}?${params.toString()}`;
                  }
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  active === item.title ? 'text-452-blue-light' : 'text-gray-700'
                }`}
              >
                {item.title}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
