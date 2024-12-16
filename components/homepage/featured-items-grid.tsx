'use client';

import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import UnderlineLink from 'components/ctas/underline';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FeaturedItems({ products }: { products: Product[] }) {
  return (
    <>
      <div className="flex flex-col items-center justify-between pb-4 md:flex-row md:pb-8">
        <h2 className="font-oswald text-3xl font-semibold uppercase text-452-blue-light md:text-5xl">
          Lo más vendido
        </h2>
        <UnderlineLink href="search/" className="text-xl uppercase text-452-blue-light">
          Ver Todo <ArrowRightIcon className="relative -top-[2px] ml-2 inline-block w-6" />
        </UnderlineLink>
      </div>
      <Swiper
        className="swiper-container-borders"
        modules={[Navigation, A11y]}
        spaceBetween={20}
        watchSlidesProgress
        slidesPerView={1.25}
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
          <SwiperSlide className="border-x-2 border-452-blue-light" key={product.handle}>
            <Link className="block" href={`/product/${product.handle}`} prefetch={true}>
              <div className="relative aspect-square">
                <Image
                  className="object-cover"
                  src={product.featuredImage.url}
                  fill
                  sizes={
                    '(min-width: 1024px) 25vw, (min-width: 768px) 33.333vw, (min-width: 640px) 50vw, 100vw'
                  }
                  priority={true}
                  alt={product.title}
                />
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
    </>
  );
}
