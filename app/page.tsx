import { SimpleHero } from 'components/hero/simple-hero';
import FeaturedItems from 'components/homepage/featured-items-grid';
import PromotionSection from 'components/homepage/promotion-section';
import ScrollableImageGrid from 'components/homepage/scrollable-image-grid';
import { getCollection, getCollectionProducts } from 'lib/shopify';

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

  // Fetch all collections in parallel
  const [tablasCollection, trucksCollection, llantasCollection] = await Promise.all([
    getCollection('tablas'),
    getCollection('trucks'),
    getCollection('llantas')
  ]);

  // Featured Collections Grid
  const gridItems = [
    {
      title: tablasCollection?.title || 'Tablas',
      imageUrl: tablasCollection?.image?.url || '',
      alt: tablasCollection?.description || 'Tablas de skate',
      href: `/search/${tablasCollection?.handle || 'tablas'}`
    },
    {
      title: trucksCollection?.title || 'Trucks',
      imageUrl: trucksCollection?.image?.url || '',
      alt: trucksCollection?.description || 'Trucks de skate',
      href: `/search/${trucksCollection?.handle || 'trucks'}`
    },
    {
      title: llantasCollection?.title || 'Llantas',
      imageUrl: llantasCollection?.image?.url || '',
      alt: llantasCollection?.description || 'Llantas de skate',
      href: `/search/${llantasCollection?.handle || 'llantas'}`
    }
  ];
  return (
    <>
      <div className="w-full">
        <SimpleHero />
      </div>
      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12">
        <FeaturedItems products={featuredProducts} title="Lo más Vendido" linkHref="/search" />
      </div>
      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12">
        <PromotionSection />
      </div>
      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12">
        <ScrollableImageGrid items={gridItems} />
      </div>
      <div className="mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12">
        <FeaturedItems
          products={featuredProducts}
          title="Lo más Nuevo"
          linkHref="/collections/lo-nuevo"
        />
      </div>
      {/* <Footer /> */}
    </>
  );
}
