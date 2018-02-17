import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Reboot from "material-ui/Reboot";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home from "../Home";
import Properties from "../Properties";
import Property from "../Property";
import About from "../About";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="app">
        <Reboot />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/properties" component={Properties} />
          <Route path="/properties/:id" component={Property} />
          <Route exact path="/about" component={About} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
