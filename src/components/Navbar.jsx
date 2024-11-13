import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          

        <img className="nav-img" src="https://st.depositphotos.com/2363887/2579/i/600/depositphotos_25792501-stock-photo-planet-earth-with-some-clouds.jpg" alt="" />


        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                AnaSayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Hakkımızda
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                İletişim
              </Link> 
            </li>

            

        

          </ul>
        </div>
      </div>
    </nav>




  );
};

export default Navbar;
