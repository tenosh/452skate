import MagneticLink from 'components/ctas/magnetic';
import logoWhiteTransparent from 'images/logos/logo-white-transparent.png';
import Image from 'next/image';
import simpleHeroImg from './simple-hero.webp';

export async function SimpleHero() {
  return (
    <section className="container flex flex-col gap-4 py-4 md:flex-row md:gap-6 md:py-9">
      <div className="img-container w-full md:w-1/2">
        <Image
          className="mx-auto h-full w-full object-cover"
          alt="Prendas nuevas"
          src={simpleHeroImg}
          width={420}
          height={525}
          priority={true}
        />
      </div>
      <div className="cta-container relative flex w-full flex-col items-center text-center md:w-1/2 md:justify-end 2xl:justify-center">
        <div className="absolute right-[20%] top-0 z-0 hidden w-[140px] md:inline-block ml:w-[200px]">
          <Image
            src={logoWhiteTransparent}
            alt="Logo"
            className="opacity-60"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
        <div className="z-10 max-w-[420px]">
          <h1 className="font-honk mx-4 mb-4 text-4xl uppercase leading-[50px] tracking-wide">
            easy, femenine,
            <i className="italic"> & </i>
            nostalgic
          </h1>
          <p className="mb-6 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          </p>
          <MagneticLink href="/search/estilo-versatil">ver lo nuevo!</MagneticLink>
        </div>
      </div>
    </section>
  );
}
