import './App.css';
import React from 'react';
import axios from 'axios';
import Header from './Components/Header';
import ViewLibro from './Components/ViewLibro';
import MenuLibro from './Components/MenuLibro';
import NewLibro from './Components/NewLibro';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/libro'>
            <MenuLibro />
            <ViewLibro />
          </Route>
          <Route exact path='/libro/nuevo'>
            <NewLibro />
          </Route>
        </Switch>


        
        
      </Router>
      
    )
  }
}

export default App;
