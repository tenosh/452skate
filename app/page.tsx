import { SimpleHero } from 'components/hero/simple-hero';
import FeaturedItems from 'components/homepage/featured-items-grid';
import PromotionSection from 'components/homepage/promotion-section';
import { getCollectionProducts } from 'lib/shopify';

export const metadata = {
  description: 'cuatro 52 skateshop',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const featuredProducts = await getCollectionProducts({
    collection: 'hidden-productos-destacados'
  });
  return (
    <>
      <div className="w-full">
        <SimpleHero />
      </div>
      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12">
        <FeaturedItems products={featuredProducts} />
      </div>
      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12">
        <PromotionSection />
      </div>
      {/* <Footer /> */}
    </>
  );
}
