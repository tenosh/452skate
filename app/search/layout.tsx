import Footer from 'components/layout/footer';
import FilterDropdown from 'components/layout/search/filter-dropdown';
import FilterTags from 'components/layout/search/filter-tags';
import FiltersModal from 'components/layout/search/filters-modal';
import { sorting } from 'lib/constants';
import { getCollections, getPage } from 'lib/shopify';
import ChildrenWrapper from './children-wrapper';

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  //get homepage metadata
  const pageData = await getPage('homepage');

  //get collections
  const collections = await getCollections();

  // Extract image URLs from metafields
  const footerMenuImage =
    pageData?.metafields?.find((field) => field.key === 'imagen_de_menu_de_pie')?.reference?.image
      ?.url || '';

  return (
    <>
      <div className="mx-auto max-w-screen-2xl !py-0 px-4 !pt-[80px] pb-4">
        <div className="fixed left-0 right-0 top-[80px] z-20 bg-white">
          <div className="border-y-2 border-452-blue-light p-4">
            <div className="container flex items-center justify-between">
              <FiltersModal collections={collections} />
              <FilterDropdown list={sorting} title="Ordenar por: " />
            </div>
          </div>
        </div>
        <div className="min-h-screen w-full pt-[72px]">
          <div className="py-4">
            <FilterTags />
          </div>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
      <Footer imagePath={footerMenuImage} />
    </>
  );
}
