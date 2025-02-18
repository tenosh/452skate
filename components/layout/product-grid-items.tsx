import Grid from 'components/grid';
import ProductCard from 'components/product/product-card';
import { Product } from 'lib/shopify/types';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <ProductCard product={product} showMinHeight={false} />
        </Grid.Item>
      ))}
    </>
  );
}
