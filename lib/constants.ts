export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const menuFilters = {
  tablas: {
    medida: ['7.25"', '7.5"', '7.75"', '8.0"', '8.125"', '8.25"', '8.5"', '8.75"'],
    marca: ['Alakin', 'Catrina', 'Zenit', 'Jaguar']
  },
  trucks: {
    medida: ['8.0"', '8.25"', '8.5"'],
    marca: ['Alakin', 'Independent', 'Destructo']
  },
  llantas: {
    marca: ['Zenit', 'Catrina', 'Spitfire', 'Alakin', 'Ricta', 'Travel on wheels', 'Bones']
  },
  baleros: {
    marca: [
      'Bronson',
      'Shake Junk',
      'Spitfire',
      'Travel on wheels',
      'Vulkan',
      'Zenit',
      'Alakin',
      'Catrina',
      'Industriales'
    ]
  },
  lijas: {
    marca: [
      'Alakin',
      'Catrina',
      'Zenit',
      'Vulkan',
      'Glitch',
      'Gato Negro',
      'Jaguar',
      'Shake Junk',
      'Mob',
      'Jessup',
      'Negra',
      'Transparente'
    ]
  },
  accesorios: {
    tipo: [
      'Tornillos',
      'Kingpin',
      'Tuercas',
      'Gomas',
      'Elevadores',
      'Pivotes',
      'Cera',
      'Limpia lijas',
      'Rieles',
      'Herramientas'
    ]
  }
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2024-10/graphql.json';
