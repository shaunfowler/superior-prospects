import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Reboot from "material-ui/Reboot";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import Home from "../Home";
import Property from "../Property";
import About from "../About";
import Contact from "../Contact";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="app">
        <Reboot />
        <Header />
        <Jumbotron />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/properties/:id" component={Property} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
