import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import './team08.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
