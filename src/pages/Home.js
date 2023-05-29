import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`container ${isHomePage ? "home-page" : ""}`}>
      <h1>Welcome to EasyCart!</h1>
      <p>
        Start your mobile journey today and elevate your digital lifestyle with
        our Mobile Shopping Store!
      </p>

      <Link to="/shop">SHOP NOW</Link>
    </div>
  );
}

export default Home;
