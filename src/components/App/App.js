import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
