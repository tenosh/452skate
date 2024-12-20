'use client';

import MainCta from 'components/ctas/main';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SimpleHeroProps {
  imagePath: string;
}

export function SimpleHero({ imagePath }: SimpleHeroProps) {
  const headingText = 'Conectando lo mejor del skate en México'.split(' ');

  return (
    <section className="relative h-[400px] w-full md:h-[650px]">
      <div className="block h-full w-full overflow-hidden">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Image
            className="h-full w-full object-cover"
            alt="Cuatro 52 skateshop"
            src={imagePath}
            width={2800}
            height={1717}
            priority={true}
          />
        </motion.div>
      </div>
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="absolute bottom-8 left-8 z-10 flex max-w-[90%] flex-col gap-4 md:max-w-[500px]">
          <h1 className="mb-5 font-oswald text-3xl font-semibold uppercase leading-9 tracking-wide text-white md:text-5xl md:leading-[1.2]">
            {headingText.map((word, i) => (
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
          </h1>
          <div>
            <MainCta href="/search">Ver todos los productos</MainCta>
          </div>
        </div>
      </div>
    </section>
  );
}
