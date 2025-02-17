'use client';

import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import UnderlineLink from 'components/ctas/underline';
import ProductCard from 'components/product/product-card';
import { motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';
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
            {products.map((product) => (
              <SwiperSlide key={product.handle}>
                <motion.div variants={itemVariants}>
                  <ProductCard product={product} priority={true} />
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
