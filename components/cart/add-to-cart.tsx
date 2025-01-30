'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  bottom
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  bottom?: boolean;
}) {
  const buttonClasses = clsx(
    'flex w-full items-center justify-center uppercase px-3 md:px-6 py-2 md:py-4 bg-452-blue-light text-white border-2 border-transparent transition-all duration-300 hover:bg-white hover:border-2 hover:text-452-blue-light font-medium hover:border-452-blue-light',
    {
      'text-base p-2': bottom,
      'text-lg p-4': !bottom
    }
  );
  const disabledClasses =
    'cursor-not-allowed opacity-60 hover:opacity-60 hover:!bg-452-blue-light hover:!text-white';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Agotado :(
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Selecciona una opción"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Selecciona una opción
      </button>
    );
  }

  return (
    <button
      aria-label="Agregar al carrito"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      Agregar al carrito
      <span className="ml-4">
        <ShoppingCartIcon className="h-5" />
      </span>
    </button>
  );
}

export function AddToCart({ product, bottom }: { product: Product; bottom?: boolean }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
      className={clsx('mb-6 md:mb-12', {
        '!md:ml-auto !mb-0': bottom
      })}
    >
      <SubmitButton
        bottom={bottom}
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
