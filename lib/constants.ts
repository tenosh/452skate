export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevancia',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Tendencias', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Más nuevos', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Precio: Bajo a alto', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Precio: Alto a bajo', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const menuFilters = {
  patinetas: {
    marca: [
      'Catrina',
      'Beat',
      'Glitch',
      'Zenit',
      'Suburbios',
      'Santa Cruz',
      'Neighborhood',
      'Copal',
      'Deza',
      'Tricolor',
      'Toy Machine',
      'Baker',
      'Deathwish',
      'Flip'
    ],
    tipo: ['Cruiser', 'Old school', 'Longboard', 'Penny', 'Clásica']
  },
  tablas: {
    medida: ['7.25"', '7.5"', '7.75"', '8.0"', '8.125"', '8.25"', '8.5"', '8.75"'],
    marca: [
      'Alakin',
      'Catrina',
      'Beat',
      'Glitch',
      'Zenit',
      'Suburbios',
      'Santa Cruz',
      'Neighborhood',
      'Copal',
      'Deza',
      'Tricolor',
      'Toy Machine',
      'Baker',
      'Deathwish',
      'Flip'
    ]
  },
  trucks: {
    medida: ['8.0"', '8.25"', '8.5"'],
    marca: ['Alakin', 'Independent', 'Destructo']
  },
  llantas: {
    marca: ['Zenit', 'Catrina', 'Spitfire', 'Alakin', 'Ricta', 'Travel on wheels', 'Bones'],
    medida: ['51mm', '52mm', '53mm', '54mm', '55mm', '56mm', '57mm', '58mm'],
    molde: ['Cónico', 'Cilíndrico', 'Clásico'],
    dureza: ['97a', '98a', '99a', '100a', '101a']
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
    ],
    abec: ['5', '7', '9'],
    tipo: ['Tapa sellada', 'Tapa de neopreno']
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
      'Clásica',
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
