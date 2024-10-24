'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="relative hidden w-64 self-end md:block">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="Buscar productos..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="text-md focus:focus-visible:border-green-dark font-chakra placeholder:font-chakra w-full rounded-xl bg-f-green-light p-2 text-f-green-dark placeholder:text-f-green-dark focus:outline-none focus:focus-visible:ring-2 focus:focus-visible:ring-f-green-dark md:text-sm"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-f-green-dark" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Buscar productos..."
        className="text-md focus:focus-visible:border-green-dark font-chakra placeholder:font-chakra w-full rounded-xl bg-f-green-light p-2 text-f-green-dark placeholder:text-f-green-dark focus:outline-none focus:focus-visible:ring-2 focus:focus-visible:ring-f-green-dark md:text-sm"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-f-green-dark" />
      </div>
    </form>
  );
}
