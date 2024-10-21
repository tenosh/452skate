import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function Item({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

const FeaturedItems = async () => {
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  const menu = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    name: `Linea ${index + 1}`,
    link: `linea/${index + 1}`
  }));
  return (
    <section className="container flex flex-col gap-4 py-4 md:gap-6 md:py-9">
      <div className="menu-container mb-6 flex flex-row flex-wrap items-center justify-center gap-4 md:gap-8">
        {menu.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="text-base text-f-orange hover:text-f-orange/80"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <section className="grid max-w-screen-2xl gap-4 pb-4 md:grid-cols-6 md:grid-rows-2 xl:max-h-[calc(100vh-200px)]">
        <Item size="full" item={firstProduct} priority={true} />
        <Item size="half" item={secondProduct} priority={true} />
        <Item size="half" item={thirdProduct} />
      </section>
    </section>
  );
};

export default FeaturedItems;
