import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className='header'>
      <div className='header-title'>
        <h1>UTN.BA</h1>
        <h2>Where are my books?</h2>
      </div>
      <nav className='nav-main'>
        <Link className='nav-main-link' to='/libros'>
          Libros
        </Link>
        <Link className='nav-main-link' to='/categorias'>
          Categorias
        </Link>
        <Link className='nav-main-link' to='/personas'>
          Personas
        </Link>
      </nav>
    </header>
  );
};

export default Header;
