import React, { Component } from "react";
import CreateBooking from './CreateBooking';
import "../App.css";
import GetFlights from './GetFlights';

export default class FlightDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightData: this.props.flightData,
            availableFlights: this.props.availableFlights,
            bookingDetails: null
        }
    }
    setBookingDetails = (flightId, flightTime, fare) => {
        this.setState({
            bookingDetails: {
                origin: this.state.flightData.origin,
                destination: this.state.flightData.destination,
                departureDate: this.state.flightData.departureDate,
                noOfTickets: this.state.flightData.noOfTickets,
                flightId: flightId,
                timing: flightTime,
                charges: Number(fare) * Number(this.state.flightData.noOfTickets)
            }
        })

    }
    render() {
        if (this.state.availableFlights == null) {
            return <GetFlights></GetFlights>
        }
        else if (this.state.bookingDetails != null) {
            return <CreateBooking bookingDetails={this.state.bookingDetails} />
        } else {
            return (
                <React.Fragment>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="card custom-card bg-card text-light">
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col-md-4">
                                            <h4>{this.state.flightData.departureDate}</h4>
                                            <div className="text-custom">Departure Date</div>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>{this.state.flightData.origin} - {this.state.flightData.destination}</h4>
                                            <div className="text-custom">Origin - Destination</div>
                                        </div>
                                        <div className="col-md-4">
                                            <h4>{this.state.flightData.noOfTickets} Adult(s)</h4>
                                            <div className="text-custom">Passengers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="float-right">
                                <button name="goBack" className="btn btn-warning btn-sm" onClick={() => { this.setState({ availableFlights: null }) }}>Go Back</button>
                            </div>
                            <h2>Available Flights:</h2>
                            {this.state.availableFlights.flightIds.map((flightId, index) => {
                                return (
                                    <div className="row mt-2 mb-2" key={index}>
                                        <div className="card bg-card custom-card text-light">
                                            <div className="card-body">
                                                <div className="row text-center">
                                                    <div className="col-md-3">
                                                        <h4>{this.state.availableFlights.flightTimings[index]}</h4>
                                                        <div className="text-custom">Non Stop</div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4>{flightId}</h4>
                                                        <div className="text-custom">Flight ID</div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4> &#8377; {this.state.availableFlights.prices[index]}</h4>
                                                        <div className="text-custom">Fare per seat</div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4>Total Fare: &#8377; {(this.state.availableFlights.prices[index]) * this.state.flightData.noOfTickets}</h4>
                                                        <button className="btn btn-sm btn-primary btn-block" onClick={() => { this.setBookingDetails(flightId, this.state.availableFlights.flightTimings[index], this.state.availableFlights.prices[index]) }} name="addPassenger">Add Passenger Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

}