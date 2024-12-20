import { clsx } from 'clsx';
import Image from 'next/image';
import mainLogo from './main-logo.png';
import secondaryLogo from './secondary-logo.png';

type Logo = {
  version?: string | undefined;
  size?: string | undefined;
  className?: string | undefined;
};

export default function Logo({ version = 'main', size = 'md', className }: Logo) {
  return (
    <div
      className={clsx(
        'flex h-auto items-center justify-center',
        {
          'w-6': size === 'sm',
          'w-14': size === 'md',
          'w-16': size === 'lg',
          'w-20': size === 'xl',
          'w-full': size === 'full'
        },
        className
      )}
    >
      <Image
        src={version === 'secondary' ? secondaryLogo : mainLogo}
        alt="Cuatro 52 skateshop"
        width={version === 'secondary' ? 600 : 160}
        height={version === 'secondary' ? 103 : 160}
      />
    </div>
  );
}
