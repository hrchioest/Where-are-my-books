import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className='header'>
      <div className='header-title'>
        <h1>UTN.BA</h1>
        <h2>Where are my books?</h2>
      </div>
      <nav className='nav-main'>
        <NavLink class='nav-main-link' to='/libros'>
          Libros
        </NavLink>
        <NavLink class='nav-main-link' to='/categorias'>
          Categorias
        </NavLink>
        <NavLink class='nav-main-link' to='/personas'>
          Personas
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
