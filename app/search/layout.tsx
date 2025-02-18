import Footer from 'components/layout/footer';
import FilterDropdown from 'components/layout/search/filter-dropdown';
import { sorting } from 'lib/constants';
import { getPage } from 'lib/shopify';
import ChildrenWrapper from './children-wrapper';
export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  //get homepage metadata
  const pageData = await getPage('homepage');

  // Extract image URLs from metafields
  const footerMenuImage =
    pageData?.metafields?.find((field) => field.key === 'imagen_de_menu_de_pie')?.reference?.image
      ?.url || '';
  return (
    <>
      <div className="mx-auto max-w-screen-2xl !py-0 px-4 !pt-[80px] pb-4">
        <div className="mb-6 flex items-center justify-between border-b border-452-blue-light pb-4">
          {/* <CollectionsModal /> */}
          <FilterDropdown list={sorting} title="Sort by" />
        </div>
        <div className="min-h-screen w-full">
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </div>
      </div>
      <Footer imagePath={footerMenuImage} />
    </>
  );
}
