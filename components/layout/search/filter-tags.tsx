'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterTags() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeFilters = Array.from(searchParams.entries()).reduce(
    (acc: { type: string; value: string }[], [key, value]) => {
      const values = value.split(',');
      return [...acc, ...values.map((v) => ({ type: key, value: v }))];
    },
    []
  );

  const removeFilter = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.get(filterType)?.split(',') || [];
    const newFilters = currentFilters.filter((filter) => filter !== value);

    if (newFilters.length > 0) {
      params.set(filterType, newFilters.join(','));
    } else {
      params.delete(filterType);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map(({ type, value }) => (
        <button
          key={`${type}-${value}`}
          onClick={() => removeFilter(type, value)}
          className="flex items-center gap-1 rounded-full border border-452-blue-light px-3 py-1 text-sm text-452-blue-light hover:bg-452-blue-light/10"
        >
          <span className="capitalize">{`${type}: ${value}`}</span>
          <XMarkIcon className="h-4 w-4" />
        </button>
      ))}
      {activeFilters.length > 1 && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1 rounded-full border border-orange-700 px-3 py-1 text-sm text-orange-700 hover:bg-orange-700/10"
        >
          Limpiar filtros
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
