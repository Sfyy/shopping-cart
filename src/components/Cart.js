import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/Cart.css";

function Cart({
  cartItems,
  removeFromCart,
  updateCartQuantity,
  isOpen,
  handleCartToggle,
  totalPrice,
}) {
  const handleQuantityChange = (event, item) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity === 0) {
      removeFromCart(item);
    } else if (newQuantity !== item.quantity) {
      updateCartQuantity(item, newQuantity);
    }
  };

  const handleIncrement = (item) => {
    updateCartQuantity(item, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartQuantity(item, item.quantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  const history = useHistory();

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        handleCartToggle();
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [handleCartToggle]);

  const handleCheckout = () => {
    history.push("/");
    handleCartToggle();
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="cart">
        <div className="cart-header">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <h2>CART</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-button"
            onClick={handleCartToggle}
          />
        </div>
        {isCartEmpty ? (
          <div className="cart-empty">Cart is currently empty!</div>
        ) : (
          <div>
            <div className="cart-items">
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item__image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item__info">
                      <div className="cart-item__name">{item.name}</div>
                      <div className="cart-item__price">{item.price}</div>
                    </div>

                    <button
                      className="increment"
                      onClick={() => handleIncrement(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} size="2x" />
                    </button>
                    <input
                      className="quantity-input"
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(event) => handleQuantityChange(event, item)}
                    />
                    <button
                      className="decrement"
                      onClick={() => handleDecrement(item)}
                    >
                      <FontAwesomeIcon icon={faMinus} size="2x" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart__total">
              Total Price: ${totalPrice}
              <button className="checkout-button" onClick={handleCheckout}>
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
      {isOpen && <div className="cart-overlay" onClick={handleCheckout}></div>}
    </div>
  );
}

export default Cart;
