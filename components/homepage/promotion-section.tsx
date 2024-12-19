'use client';

import MainCta from 'components/ctas/main';
import { motion } from 'framer-motion';
import Image from 'next/image';
import promoImg from '../../images/banners/promo-section.jpg';

export default function PromotionSection() {
  const title = 'Your Promotional Title Goes Here'.split(' ');

  return (
    <section className="relative h-[400px] w-full md:h-auto md:pb-[66%]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Image src={promoImg} alt="Promotion background" fill className="object-cover" />
        </motion.div>
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="flex w-full justify-center px-4 md:justify-start md:pl-16 lg:pl-24">
          <div className="max-w-md text-center">
            <h3 className="mb-4 font-oswald text-3xl font-bold uppercase tracking-wider text-white md:mb-8 md:text-5xl">
              {title.map((word, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.2em] inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </h3>
            <p className="mb-4 bg-452-blue-light text-base md:mb-8 md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. numquam earum reprehenderit?
            </p>
            <MainCta href="/search">Promotion cta link</MainCta>
          </div>
        </div>
      </div>
    </section>
  );
}
