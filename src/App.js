import React, { Component } from "react";
import Main from "./components/main";
import Checkout from "./components/checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact="true" path="/" component={Main} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
