import React, { useState } from "react";

import "../styles/ProductCard.css";

function ProductCard(props) {
  const [quantity] = useState(1);

  const handleAddToCart = () => {
    props.addToCart(props.product, quantity);
  };

  return (
    <div className="product-card">
      <h2>{props.product.name}</h2>
      <div className="image">
        <img src={props.product.image} alt={props.product.name} />
      </div>
      <p className="specs">{props.product.description}</p>

      <p className="price">{props.product.price}</p>

      <div className="add">
        <button className="add-to-cart" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
