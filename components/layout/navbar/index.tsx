import CartModal from 'components/cart/modal';
import Logo from 'components/layout/logo/logo';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="font-honk relative flex items-center justify-between bg-f-green pt-2">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between md:container md:pb-2">
          <Link
            href="/"
            prefetch={true}
            className="flex w-full items-center justify-center md:w-auto"
          >
            <Logo version="f" size="sm" />
          </Link>
          <div className="flex gap-2 pr-4 md:pr-0 lg:gap-4">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
            <div className="flex h-11 w-11">
              <CartModal />
            </div>
          </div>
        </div>
        <div className="hidden h-[1px] w-full bg-f-green-light md:block"></div>
        <div className="container hidden w-full py-2 md:flex">
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link href={item.path} prefetch={true} className="text-f-green-light">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden h-[1px] w-full bg-f-green-light md:block"></div>
      </div>
    </nav>
  );
}
