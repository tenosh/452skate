import { SimpleHero } from 'components/hero/simple-hero';
import FeaturedItems from 'components/homepage/featured-items-grid';

export const metadata = {
  description: 'Moda Alternativa.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <div className="w-full bg-f-green">
        <SimpleHero />
      </div>
      <div className="w-full bg-f-green-light">
        <FeaturedItems />
      </div>
      {/* <div className="w-full bg-f-green-light">
        <Ticker text="Breaking news: This ticker now loops continuously without ever stopping!" />
      </div> */}
      {/* <Footer /> */}
    </>
  );
}
