import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';


class MenuLibro extends React.Component {
    render() {
        return (
            <Router>
                <a href="/libro/nuevo">
                    <nav className='subnav-main'>
                    <p>Agregar libro</p>
                    </nav>
                </a>
            </Router>
        )}
}

export default MenuLibro;