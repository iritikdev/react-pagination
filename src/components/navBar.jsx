import React from "react";
import { Link } from "react-router-dom";

const NavbBar = () => {
  return (
    <nav class="navbar">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Vidly
        </Link>

        <div style={{ display: "flex" }}>
          <Link class="nav-link active" to="/movies">
            Movies
          </Link>
          <Link class="nav-link" to="/rental">
            Rental
          </Link>
          <Link class="nav-link" to="/customers">
            Customers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbBar;
