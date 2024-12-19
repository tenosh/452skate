import MainCta from 'components/ctas/main';
import Image from 'next/image';
import simpleHeroImg from '../../images/banners/main-banner.jpg';

export async function SimpleHero() {
  return (
    <section className="relative h-[400px] w-full md:h-[650px]">
      <div className="block h-full w-full overflow-hidden">
        <Image
          className="h-full w-full object-cover"
          alt="Cuatro 52 skateshop"
          src={simpleHeroImg}
          width={2800}
          height={1717}
          priority={true}
        />
      </div>
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="absolute bottom-8 left-8 z-10 flex max-w-[90%] flex-col gap-4 md:max-w-[500px]">
          <h1 className="mb-5 font-oswald text-3xl font-semibold uppercase leading-9 tracking-wide text-white md:text-5xl md:leading-[1.2]">
            Conectando lo mejor del skate en México
          </h1>
          <div>
            <MainCta href="/search">Ver todos los productos</MainCta>
          </div>
        </div>
      </div>
    </section>
  );
}
