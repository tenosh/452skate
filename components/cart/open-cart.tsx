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
      <div className="justify-centert relative top-[.5px] flex h-6 w-6 items-center transition-colors lg:h-8 lg:w-8">
        <AnimatedIcon icon={<ShoppingCartIcon className={className} />} />
        {quantity ? (
          <div className="absolute right-0 top-0 -mr-2 -mt-3 h-5 w-5 rounded-full bg-452-blue-light text-[13px] font-medium">
            {quantity}
          </div>
        ) : null}
      </div>
    </MagneticElement>
  );
}
