import React from 'react';

interface ProductTileProps {
  name: string;
  price: string;
}

const ProductTile: React.FC<ProductTileProps> = ({ name, price }) => {
  return (
    <div className="h-64 w-48 bg-gray-400">
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
};

export default ProductTile;
