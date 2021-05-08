import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className='header'>
      <div className='header-title' style={{ paddingBottom: "10px" }}>
        <h1 style={{ margin: "0" }}>Where are my books?</h1>
        <img src='./image/searching.png' width='70px' />
      </div>
      <nav className='nav-main'>
        <Link className='nav-main-link' to='/books'>
          Books
        </Link>
        <Link className='nav-main-link' to='/categories'>
          Categories
        </Link>
        <Link className='nav-main-link' to='/persons'>
          Persons
        </Link>
      </nav>
    </header>
  );
};

export default Header;
