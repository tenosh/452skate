'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ListItem } from './filter';
import { FilterItem } from './filter/item';

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
    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-452-blue-light hover:opacity-80"
      >
        <span className="font-oswald text-lg">{title}</span>
        <ChevronDownIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-2 w-48 rounded-md border border-452-blue-light bg-white p-2 shadow-lg">
          {list.map((item: ListItem, i) => (
            <div key={i} onClick={() => setIsOpen(false)}>
              <FilterItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
