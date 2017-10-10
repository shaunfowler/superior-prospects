import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home from "../Home";
import Properties from "../Properties";
import Property from "../Property";
import About from "../About";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/properties" component={Properties} />
          <Route path="/properties/:id" component={Property} />
          <Route exact path="/about" component={About} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
