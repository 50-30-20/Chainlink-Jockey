import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from '../logo.png';
import Game from './Game/Game'
import './App.css';
import Navbar from './Navbar/navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Game} />
          {/* <Route path='/Services' component={} />
          <Route path='/Faucet' component={} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
