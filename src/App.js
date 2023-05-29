import React, { useState } from "react";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import mockData from "./mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./styles/App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const history = useHistory();

  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  const addToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
  };

  const updateCartQuantity = (item, newQuantity) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    updatedCartItems[existingItemIndex].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleHomeCartClick = () => {
    history.push("/shop");
    setCartOpen(true);
  };

  return (
    <div className="container">
      <header>
        <Link to="/" className="no-underline">
          <h1>EasyCart</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <button onClick={handleHomeCartClick} className="cart-button">
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className={`shop-page ${isCartOpen ? "cart-open" : ""}`}></div>
      <div className={`header ${isHomePage ? "home-page" : "shop-page"}`}>
        <Switch>
          <Route exact path="/">
            <div className="container home-page">
              <Home handleCartClick={handleHomeCartClick} />
            </div>
          </Route>
          <Route path="/shop">
            <Shop
              products={mockData}
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
              isCartOpen={isCartOpen}
              setCartOpen={setCartOpen}
              handleCartToggle={handleCartToggle}
            />
          </Route>
        </Switch>
      </div>
      <div className="footer">
        <p> Built by Sfy.</p>

        <a href="https://github.com/Sfyy">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
}

export default App;
