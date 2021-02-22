import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';


class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className='header-title'>
                    <h1>Where'is my books?</h1>
                </div>
                <Router>
                <nav className='nav-main'>
                    <Link to='/libro'>Libro</Link>
                    <a href="/genero">Genero</a>
                    <a href="/persona">Persona</a>
                </nav>
                </Router>
            </header>
        )}
}

export default Header;