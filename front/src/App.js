import './App.css';
import React from 'react';
import axios from 'axios';
import Header from './Components/Header';
import ViewLibro from './Components/ViewLibro';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ViewLibro />
      </div>
      
    )
  }
}

export default App;
