import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

export default function BookingDetailsCard(props){
    return(
        <React.Fragment>
            <div>

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



            <div className="text-custom">Flight ID</div>
            <h4 className="ml-4">{props.bookingDetails.flightId}</h4>
            <div className="text-custom">Timing</div>  
            <h4 className="ml-4">{props.bookingDetails.timing}</h4>
            <div className="text-custom">Departure Date</div>
            <h4 className="ml-4">{props.bookingDetails.departureDate}</h4>
            <div className="text-custom">Origin - Destination</div>
            <h4 className="ml-4">{props.bookingDetails.origin} - {props.bookingDetails.destination}</h4>
            <div className="text-custom">Passengers</div>
            <h4 className="ml-4">{props.bookingDetails.noOfTickets} Adult(s)</h4>
            <div className="text-custom">Total Fare</div>
            <h4 className="ml-4"> &#8377; {Number(props.bookingDetails.charges)}</h4> 
        </div>
        </React.Fragment>
    )
}