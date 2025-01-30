'use client';

import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import UnderlineLink from 'components/ctas/underline';
import Price from 'components/price';
import { motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FeaturedItems({
  products,
  title = 'Lo más vendido',
  linkHref = 'search/'
}: {
  products: Product[];
  title?: string;
  linkHref?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-3 md:mb-8 md:flex-row md:items-center">
        <h2 className="font-oswald text-3xl font-semibold uppercase text-452-blue-light md:text-5xl">
          {title}
        </h2>
        <UnderlineLink href={linkHref} className="text-xl uppercase text-452-blue-light">
          Ver Todo <ArrowRightIcon className="relative -top-[2px] ml-2 inline-block w-6" />
        </UnderlineLink>
      </div>
      {isLoading && (
        <div className="relative overflow-hidden">
          <div className="flex gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-[80%] flex-none animate-pulse sm:w-[44%] md:w-[29%] lg:w-1/4 ${i >= 2 ? 'hidden sm:block' : ''} ${i >= 3 ? 'hidden md:block' : ''} `}
              >
                <div className="relative aspect-square bg-gray-200" />
                <div className="min-h-[10rem] space-y-4 p-4 md:min-h-[15rem]">
                  <div className="h-6 w-3/4 rounded bg-gray-200" />
                  <div className="h-6 w-1/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Swiper
            className="swiper-container-borders"
            modules={[Navigation, A11y]}
            spaceBetween={20}
            watchSlidesProgress
            slidesPerView={1.25}
            onInit={() => setIsLoading(false)}
            breakpoints={{
              640: {
                slidesPerView: 2.25
              },
              768: {
                slidesPerView: 3.35
              },
              1024: {
                slidesPerView: 4
              }
            }}
            navigation={{
              nextEl: '.custom-button-next',
              prevEl: '.custom-button-prev'
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.handle}>
                <motion.div variants={itemVariants}>
                  <Link
                    className="block border-x-2 border-452-blue-light"
                    href={`/product/${product.handle}`}
                    prefetch={true}
                  >
                    <div className="relative aspect-square">
                      <Image
                        className="object-cover"
                        src={product.featuredImage.url}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33.333vw, (min-width: 640px) 50vw, 100vw"
                        priority={true}
                        alt={product.title}
                      />
                      {product.tags?.includes('nuevo') && (
                        <div className="absolute left-4 top-4 z-10 rounded-full bg-452-blue-light px-4 py-2 font-chakra text-sm uppercase leading-none text-white">
                          Nuevo
                        </div>
                      )}
                    </div>
                    <div className="flex min-h-[10rem] flex-col gap-4 p-4 font-oswald text-base text-452-blue-light md:min-h-[15rem] md:gap-6 lg:text-2xl">
                      <h3 className="truncate leading-none tracking-wide">{product.title}</h3>
                      <Price
                        className="flex-none font-chakra"
                        amount={product.priceRange.maxVariantPrice.amount}
                        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                        currencyCodeClassName="hidden @[275px]/label:inline"
                      />
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
            <div
              className="absolute bottom-0 z-10 flex w-full flex-row justify-between border-y-2 border-452-blue-light py-2"
              slot="container-end"
            >
              <button className="custom-button-prev ml-2 text-452-blue-light disabled:opacity-50 md:ml-4">
                <ArrowLongLeftIcon className="w-10" />
              </button>
              <button className="custom-button-next mr-2 text-452-blue-light disabled:opacity-50 md:mr-4">
                <ArrowLongRightIcon className="w-10" />
              </button>
            </div>
          </Swiper>
        </motion.div>
      </div>
    </>
  );
}
