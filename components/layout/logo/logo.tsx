import { clsx } from 'clsx';
import Image from 'next/image';
import fLogo from './f-logo.png';
import mainLogo from './main-logo.png';

type Logo = {
  version?: string | undefined;
  size?: string | undefined;
};

export default function Logo({ version = 'main', size = 'md' }: Logo) {
  return (
    <div
      className={clsx('flex h-auto items-center justify-center', {
        'w-6': size === 'sm',
        'w-14': size === 'md',
        'w-16': size === 'lg'
      })}
    >
      <Image
        src={version === 'f' ? fLogo : mainLogo}
        alt="Fritacha Moda Alternativa"
        width={version === 'f' ? 158 : 125}
        height={version === 'f' ? 280 : 155}
      />
    </div>
  );
}
