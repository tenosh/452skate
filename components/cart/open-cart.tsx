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
    <div className="justify-centert relative top-[.5px] flex h-6 w-6 items-center transition-colors lg:h-7 lg:w-7">
      <ShoppingBagIcon className={clsx('transition-all ease-in-out hover:scale-110', className)} />

      {quantity ? (
        <div className="bg-f-orange absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded text-[11px] font-medium">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
