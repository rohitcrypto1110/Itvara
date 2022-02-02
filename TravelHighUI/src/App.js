import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import GetBooking from "./components/GetBookings";
import GetFlights from "./components/GetFlights";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import HomePage from "./pages/HomePage";

import Evaluator from './testing/evaluator';
import "./App.css";

class AppComp extends Component {
  render() {
    return (
      <Router >
        <div >
          <Evaluator></Evaluator>
          <Switch>
          <Route exact path="/" render={() =>(<Redirect to="/sign-up"/>)} />
          <Route exact path="/sign-up" component={SignUpForm} />
            <Route exact path="/sign-in" component={SignInForm} />
            <Route exact path="/bookFlight" component={GetFlights} />
            <Route exact path="/viewBooking" component={GetBooking} />
            <Route exact path="/HomePage" component={HomePage} />
          </Switch>
          </div>
      </Router>
    );
  }
}

export default AppComp;