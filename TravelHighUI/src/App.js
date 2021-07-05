import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import GetBooking from "./components/GetBookings";
import GetFlights from "./components/GetFlights";

import Evaluator from './testing/evaluator';
import "./App.css";

class AppComp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Evaluator></Evaluator>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <span className="navbar-brand font-weight-bolder"><img alt="navbar brand logo" src="assets/logo.png" height="30vw" width="30vw" className="mr-2"/> Fly High</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-2">
                <Link className="nav-link font-weight-bold" to="/bookFlight">
                  Book Flight
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link className="nav-link font-weight-bold" to="/viewBooking">
                  View Booking Details
                </Link>
              </li>
            </ul>
            </div>
          </nav>
                   
          <Switch>
          <Route exact path="/" render={() =>(<Redirect to="/bookFlight"/>)} />
            <Route exact path="/bookFlight" component={GetFlights} />
            <Route exact path="/viewBooking" component={GetBooking} />
          </Switch>
          </div>
        
      </Router>
    );
  }
}

export default AppComp;