import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import FeaturedItems from 'components/homepage/featured-items-grid';
import PoliciesSection from 'components/homepage/policies-section';
import Footer from 'components/layout/footer';
import SectionContainer from 'components/layout/section-container';
import GallerySkeleton from 'components/product/gallery-skeleton';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import SwiperGallery from 'components/product/swiper-gallery';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getPage, getProduct, getProductRecommendations } from 'lib/shopify';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  //get homepage metadata
  const pageData = await getPage('homepage');

  // Extract image URLs from metafields
  const footerMenuImage =
    pageData?.metafields?.find((field) => field.key === 'imagen_de_menu_de_pie')?.reference?.image
      ?.url || '';

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <SectionContainer className="!py-0 !pt-[80px]">
        <div className="mt-4 flex flex-col justify-center gap-4 md:mt-8 md:flex-row md:gap-8">
          <div className="w-full md:w-1/2 md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
            <Suspense fallback={<GallerySkeleton />}>
              <SwiperGallery images={product.images} />
            </Suspense>
          </div>
          <div className="w-full md:w-1/2 md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <RelatedProducts id={product.id} />
      </SectionContainer>
      <SectionContainer>
        <PoliciesSection />
      </SectionContainer>
      <div className="w-full">
        <Footer imagePath={footerMenuImage} />
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <>
      <FeaturedItems products={relatedProducts} title="También te podría gustar" />
    </>
  );
}
