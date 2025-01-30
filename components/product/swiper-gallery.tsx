'use client';

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Image as ImageType } from 'lib/shopify/types';
import Image from 'next/image';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/dist/photoswipe.css';
import { useEffect, useMemo, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import GallerySkeleton from './gallery-skeleton';

export default function SwiperGallery({ images }: { images: ImageType[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pswpModule, setPswpModule] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const photoSwipeItems = useMemo(() => {
    return images.map((image) => ({
      src: image.url,
      w: image.width || 1800,
      h: image.height || 1800,
      alt: image.altText
    }));
  }, [images]);

  useEffect(() => {
    // Load PhotoSwipe module once
    import('photoswipe').then((module) => {
      setPswpModule(module);
    });
  }, []);

  const openPhotoSwipe = (index: number) => {
    if (!pswpModule) return;

    const lightbox = new PhotoSwipe({
      dataSource: photoSwipeItems,
      index: index,
      pswpModule: pswpModule
    });

    lightbox.init();

    lightbox.on('change', () => {
      if (mainSwiper) {
        mainSwiper.slideTo(lightbox.currIndex);
      }
    });
  };

  const slideNext = () => {
    if (mainSwiper) {
      mainSwiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (mainSwiper) {
      mainSwiper.slidePrev();
    }
  };

  return (
    <>
      {isLoading && <GallerySkeleton />}

      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        <div className="relative">
          <Swiper
            onSwiper={setMainSwiper}
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
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative aspect-square cursor-zoom-in"
                  onClick={() => openPhotoSwipe(index)}
                >
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
          <button
            onClick={slidePrev}
            className={`absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity md:block ${
              isBeginning ? 'cursor-not-allowed opacity-50' : 'opacity-100 hover:bg-gray-100'
            }`}
            disabled={isBeginning}
          >
            <ChevronLeftIcon className="h-6 w-6 text-452-blue-light" />
          </button>
          <button
            onClick={slideNext}
            className={`absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity md:block ${
              isEnd ? 'cursor-not-allowed opacity-50' : 'opacity-100 hover:bg-gray-100'
            }`}
            disabled={isEnd}
          >
            <ChevronRightIcon className="h-6 w-6 text-452-blue-light" />
          </button>
        </div>
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
