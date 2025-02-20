'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
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
      <div className="flex flex-row gap-4">
        <span className="font-oswald text-lg">{title}</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <span className="font-chakra leading-normal">{active}</span>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-2 w-48 rounded-md border border-452-blue-light bg-white p-2 shadow-lg">
          {list.map((item: ListItem, i) => (
            <button
              key={i}
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
