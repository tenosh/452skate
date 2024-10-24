import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="justify-centert relative top-[.5px] flex h-7 w-7 items-center text-f-green-light transition-colors">
      <ShoppingBagIcon className={clsx('transition-all ease-in-out hover:scale-110', className)} />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-f-orange text-[11px] font-medium text-f-green-light">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
