import Image from 'next/image';
import simpleHeroImg from './main-banner.jpg';

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
    </section>
  );
}
