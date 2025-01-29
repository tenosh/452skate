'use client';

import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Image as ImageType } from 'lib/shopify/types';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SwiperGallery({ images }: { images: ImageType[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="space-y-4">
          {/* Main image skeleton */}
          <div className="relative aspect-square w-full animate-pulse bg-gray-200" />

          <div className="h-[2px] w-full bg-452-blue-light" />

          {/* Thumbnails skeleton */}
          <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 lg:grid-cols-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square animate-pulse bg-gray-200 ${i >= 4 ? 'hidden sm:block' : ''} ${i >= 6 ? 'hidden lg:block' : ''}`}
              />
            ))}
          </div>

          {/* Navigation buttons skeleton */}
          <div className="mt-4 flex w-full flex-row justify-between border-y-2 border-452-blue-light py-2">
            <div className="ml-2 text-452-blue-light opacity-50 md:ml-4">
              <ArrowLongLeftIcon className="w-10" />
            </div>
            <div className="mr-2 text-452-blue-light opacity-50 md:mr-4">
              <ArrowLongRightIcon className="w-10" />
            </div>
          </div>
        </div>
      )}

      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.25 },
            768: { slidesPerView: 1 }
          }}
          navigation={{
            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev'
          }}
          onInit={() => setIsLoading(false)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-square">
                <Image
                  className="object-cover"
                  src={image.url}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={true}
                  alt={image.altText}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="my-4 h-[2px] w-full bg-452-blue-light"></div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={4}
          breakpoints={{
            640: {
              slidesPerView: 6
            },
            1024: {
              slidesPerView: 8
            }
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-square">
                <Image
                  className="object-cover"
                  src={image.url}
                  fill
                  sizes="(min-width: 1024px) 12.5vw, (min-width: 640px) 16.67vw, 25vw"
                  priority={true}
                  alt={image.altText}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-4 flex w-full flex-row justify-between border-y-2 border-452-blue-light py-2">
          <button className="custom-button-prev ml-2 text-452-blue-light disabled:opacity-50 md:ml-4">
            <ArrowLongLeftIcon className="w-10" />
          </button>
          <button className="custom-button-next mr-2 text-452-blue-light disabled:opacity-50 md:mr-4">
            <ArrowLongRightIcon className="w-10" />
          </button>
        </div>
      </div>
    </>
  );
}
