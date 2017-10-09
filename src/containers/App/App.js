import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Home from "../Home/Home";
import Properties from "../Properties/Properties";
import Property from "../Property/Property";
import About from "../About/About";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
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
