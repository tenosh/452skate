import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import MagneticElement from 'components/ctas/magnetic';
import AnimatedIcon from 'components/icons/color-change-icon';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <MagneticElement>
      <div className="justify-centert relative top-[.5px] flex h-6 w-6 items-center transition-colors lg:h-7 lg:w-7">
        <AnimatedIcon icon={<ShoppingCartIcon className={className} />} />
        {quantity ? (
          <div className="bg-f-orange absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded text-[11px] font-medium">
            {quantity}
          </div>
        ) : null}
      </div>
    </MagneticElement>
  );
}
