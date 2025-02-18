'use client';

import clsx from 'clsx';
import Price from 'components/price';
import { motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  imageSizes?: string;
  showHoverEffect?: boolean;
  priority?: boolean;
  showMinHeight?: boolean;
}

export default function ProductCard({
  product,
  imageSizes = '(min-width: 1024px) 25vw, (min-width: 768px) 33.333vw, (min-width: 640px) 50vw, 100vw',
  showHoverEffect = true,
  priority = false,
  showMinHeight = true
}: ProductCardProps) {
  return (
    <Link
      className="block border-x-2 border-452-blue-light"
      href={`/product/${product.handle}`}
      prefetch={true}
    >
      <div className="relative aspect-square overflow-hidden">
        {showHoverEffect ? (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                className="object-cover"
                src={product.featuredImage.url}
                fill
                sizes={imageSizes}
                priority={priority}
                alt={product.title}
              />
            </motion.div>
            {product.hoverImage && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Image
                  className="object-cover"
                  src={product.hoverImage.url}
                  fill
                  sizes={imageSizes}
                  priority={priority}
                  alt={`${product.title} - Hover`}
                />
              </motion.div>
            )}
          </>
        ) : (
          <Image
            className="object-cover"
            src={product.featuredImage.url}
            fill
            sizes={imageSizes}
            priority={true}
            alt={product.title}
          />
        )}
        {product.tags?.includes('nuevo') && (
          <div className="absolute left-4 top-4 z-10 rounded-full bg-452-blue-light px-4 py-2 font-chakra text-sm uppercase text-white">
            Nuevo
          </div>
        )}
      </div>
      <div
        className={clsx(
          'flex flex-col gap-4 p-4 font-oswald text-base text-452-blue-light md:gap-6 lg:text-2xl',
          showMinHeight && 'min-h-[10rem] md:min-h-[15rem]'
        )}
      >
        <h3 title={product.title} className="truncate tracking-wide">
          {product.title}
        </h3>
        <Price
          className="flex-none font-chakra"
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </Link>
  );
}
