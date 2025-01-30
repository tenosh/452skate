import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b-2 border-452-blue-light pb-6 text-452-blue-light">
        <h1 className="mb-4 text-5xl font-medium md:mb-8">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-452-blue-light p-2 text-sm">
          <Price
            className="tracking-wider text-white"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />
      <section className="mb-8 last:mb-0 xl:mb-12">
        <div className="mb-4 text-xl font-medium tracking-wide text-452-blue-light lg:text-2xl xl:text-4xl">
          Información
        </div>
        <div className="mb-6 border-t border-dashed border-452-blue-light"></div>
        <div className="py-2 md:py-4">
          {product.descriptionHtml ? (
            <Prose className="mb-6 text-sm leading-tight" html={product.descriptionHtml} />
          ) : null}
        </div>
      </section>
    </>
  );
}
