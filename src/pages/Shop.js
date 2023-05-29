import React from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

import "../styles/Shop.css";

function Shop(props) {
  const handleCartToggle = () => {
    props.setCartOpen(!props.isCartOpen);
  };

  const calculateTotalPrice = () => {
    const totalPrice = props.cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  return (
    <div className="shop">
      <div className="product-grid">
        {props.products.map((product) => (
          <div key={product.id} className="product-item">
            <ProductCard
              key={product.id}
              product={product}
              addToCart={props.addToCart}
              removeFromCart={props.removeFromCart}
            />
          </div>
        ))}
      </div>
      <Cart
        cartItems={props.cartItems}
        removeFromCart={props.removeFromCart}
        updateCartQuantity={props.updateCartQuantity}
        isOpen={props.isCartOpen}
        handleCartToggle={handleCartToggle}
        totalPrice={calculateTotalPrice()}
      />
    </div>
  );
}

export default Shop;
