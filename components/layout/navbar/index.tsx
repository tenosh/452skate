import { getMenu } from 'lib/shopify';
import NavbarItems from './navbar-items';

const { SITE_NAME } = process.env;

export async function Navbar({ skipScrollAnimation }: { skipScrollAnimation?: boolean }) {
  const menu = await getMenu('main-menu');

  return <NavbarItems menu={menu} skipScrollAnimation={skipScrollAnimation} />;
}
