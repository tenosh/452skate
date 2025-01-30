'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';
import { useEffect, useRef, useState } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [isMainButtonVisible, setIsMainButtonVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasPassedMainButton, setHasPassedMainButton] = useState(false);
  const mainButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: any) => {
        setIsMainButtonVisible(entry.isIntersecting);
        setHasPassedMainButton(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    if (mainButtonRef.current) {
      observer.observe(mainButtonRef.current);
    }

    const handleScroll = () => {
      // Check if we're near the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100; // 100px threshold
      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (mainButtonRef.current) {
        observer.unobserve(mainButtonRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="mb-6 flex flex-col border-b-2 border-452-blue-light pb-6 text-452-blue-light">
        <h1 className="mb-4 text-3xl font-medium md:mb-8 md:text-5xl">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-452-blue-light p-2 text-sm">
          <Price
            className="tracking-wider text-white"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <div ref={mainButtonRef}>
        <AddToCart product={product} />
      </div>
      <section className="mb-8 last:mb-0 xl:mb-12">
        <div className="mb-4 text-3xl font-medium tracking-wide text-452-blue-light lg:text-4xl">
          Información
        </div>
        <div className="mb-6 border-t border-dashed border-452-blue-light"></div>
        <div className="py-2 md:py-4">
          {product.descriptionHtml ? (
            <Prose className="mb-6 text-sm leading-tight" html={product.descriptionHtml} />
          ) : null}
        </div>
      </section>

      <AnimatePresence>
        {!isMainButtonVisible && !isAtBottom && hasPassedMainButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-452-blue-light bg-white p-2 shadow-lg"
          >
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
              <VariantSelector
                bottom={true}
                options={product.options}
                variants={product.variants}
              />
              <AddToCart bottom={true} product={product} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
