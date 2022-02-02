import React from "react";
import { Button, Box, CardMedia } from '@material-ui/core';
import "./styles.css";
import { BrowserRouter as Router, useHistory, Switch, Link, Redirect } from "react-router-dom";


export default function HomePage(props){

    // const history = useHistory();

    // const handleJourney = () => {
    //     let path = `http://localhost:3006/bookFlight`;
    //     history.push(path);
    // }


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

            {/* <CardMedia component="iframe" src="./video.mp4" allow="autoPlay" /> */}


            <div className="Container">
            <Box m={2} pt={3}>
            <Link to = "/planYourJourney" className="btn btn-primary">
            Plan Your Journey with Strangers
            </Link>
            </Box>
            <Box m={2} pt={3}>
            <Link to = "/bookFlight" className="btn btn-primary">
            Book your Tickets
            </Link>
            </Box>
            </div>


            
            
        </div>
        
        </React.Fragment>
    )
}