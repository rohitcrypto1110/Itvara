import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import BookingDetailsCard from './BookingDetailsCard';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";


const url = "http://localhost:1050/viewBookingDetails/";

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: null,
      bookingId: "",
      errorMessage: "",
    };
  }
  fetchBooking = () => {
    this.setState({ errorMessage: "", bookingData: null })
    axios.get(url+this.state.bookingId)
      .then(response => {
        console.log(response.data[0])
        this.setState({ bookingData: response.data[0], errorMessage: "" });
      }).catch(error => {
        this.setState({ errorMessage: error.response.data.message, bookingData: null });
      });
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.fetchBooking();
  }
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    this.setState({ bookingId:value });
  };

  render() {
    return (
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



        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light mb-5">
                <div className="card-body">
                  <h4>View Booking Details</h4>
                  <form onSubmit={this.handleSubmit}>
                    <input name="bookingId" className="form-control" placeholder="Booking ID" type="number" value={this.state.bookingId} onChange={this.handleChange} required id="bookingId"/><br/>
                    <button name="viewDetails" type="submit" className="btn-block btn btn-sm btn-primary">View Details</button>
                  </form>
                  <span className="text-danger" name="errorMessage">{this.state.errorMessage}</span>
                  {
                    this.state.bookingData!=null?(
                      <div className="mt-3 mb-3">
                        <BookingDetailsCard bookingDetails={this.state.bookingData}/>
                      </div>
                    ):null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GetBooking;