import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>{product.description}</p>
        <button>Add to Cart 🛒</button>
      </div>
    </div>
  );
};

export default ProductCard;
