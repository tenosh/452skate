import { SimpleHero } from 'components/hero/simple-hero';
import FeaturedItems from 'components/homepage/featured-items-grid';
import PoliciesSection from 'components/homepage/policies-section';
import PromotionSection from 'components/homepage/promotion-section';
import ScrollableImageGrid from 'components/homepage/scrollable-image-grid';
import SectionContainer from 'components/layout/section-container';
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
      <SectionContainer>
        <FeaturedItems products={featuredProducts} title="Lo más Vendido" linkHref="/search" />
      </SectionContainer>
      <SectionContainer>
        <PromotionSection />
      </SectionContainer>
      <SectionContainer>
        <ScrollableImageGrid items={gridItems} />
      </SectionContainer>
      <SectionContainer>
        <FeaturedItems
          products={featuredProducts}
          title="Lo más Nuevo"
          linkHref="/collections/lo-nuevo"
        />
      </SectionContainer>
      <SectionContainer>
        <PoliciesSection />
      </SectionContainer>
      {/* <Footer /> */}
    </>
  );
}
