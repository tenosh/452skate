import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';

interface MainCtaProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const MainCta = ({ href, onClick, children, className = '' }: MainCtaProps) => {
  const baseStyles =
    'uppercase inline-block px-3 md:px-6 py-2 md:py-4 bg-white text-sm md:text-base text-black border-2 border-transparent transition-all duration-300 hover:bg-452-blue-light hover:border-white hover:text-white font-medium';

  return (
    <>
      {href ? (
        <Link href={href} className={`${baseStyles} ${className}`}>
          {children}
          <ArrowRightIcon className="ml-3 inline w-4 md:w-6" />
        </Link>
      ) : (
        <button onClick={onClick} className={`${baseStyles} ${className}`}>
          {children}
          <ArrowRightIcon className="ml-3 inline w-4 md:w-6" />
        </button>
      )}
    </>
  );
};

export default MainCta;
