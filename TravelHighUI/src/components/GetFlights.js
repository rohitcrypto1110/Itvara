import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import FlightDetails from './flightDetails';

const url = "http://localhost:1050/getFlights/";

export default class GetFlights extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableFlights:null,
            form:{
                origin: "",
                destination: "",
                departureDate: "",
                noOfTickets: 0
            },
            formErrorMessage:{
                originError: "",
                destinationError: "",
                departureDateError: "",
                noOfTicketsError: ""
            },
            formValid:{
                originfield: false,
                destinationfield: false,
                departureDatefield: false,
                noOfTicketsfield: false,
                buttonActive:false,
            },
            errorMessage:"",
        }
    }
    submitBooking = () => {
        const { form } = this.state;
        this.setState({ errorMessage: "", availableFlights: null })
        axios.get(url+form.origin+"/"+form.destination)
          .then(response => {
              console.log(response.data[0])
            this.setState({ availableFlights: response.data[0], errorMessage: "" });
          }).catch(error => {
              if(error.response) {
                this.setState({ errorMessage: error.response.data.message, availableFlights: null });
              }
              else {
                  this.setState({ errorMessage: "Server error", availableFlights: null })
              }
          });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.submitBooking();
    };
    
    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { form } = this.state;
        this.setState({ form: { ...form, [name]: value } });
        this.validateField(name, value);
    };
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrorMessage;
        let formValid = this.state.formValid;
    
        switch (fieldName) {
            case "origin":
                const originRegex = /^[A-Za-z]{1,15}$/
                if (value === "") {
                fieldValidationErrors.originError = "field required";
                formValid.originfield = false;
                } else if (!value.match(originRegex)) {
                fieldValidationErrors.originError = "Please enter a valid origin city";
                formValid.originfield = false;
                } else {
                fieldValidationErrors.originError = "";
                formValid.originfield = true;
                }
                break;
            case "destination":
                const destinationRegex = /^[A-Za-z]{1,15}$/
                if (value === "") {
                fieldValidationErrors.destinationError = "field required";
                formValid.destinationfield = false;
                } else if (!value.match(destinationRegex)) {
                fieldValidationErrors.destinationError = "Please enter a valid destination city";
                formValid.destinationfield = false;
                } else {
                fieldValidationErrors.destinationError = "";
                formValid.destinationfield = true;
                }
                break;
            case "departureDate":
                const today = new Date();
                const userDate = new Date(value)
                if (value === "") {
                    fieldValidationErrors.departureDateError = "field required";
                    formValid.departureDatefield = false;
                } else if(userDate<today){
                    fieldValidationErrors.departureDateError = "Departure date cannot be before today";
                    formValid.departureDatefield = false;
                } else {
                    fieldValidationErrors.departureDateError = "";
                    formValid.departureDatefield = true;
                }
                break;
            case "noOfTickets":
                if (value === "") {
                    fieldValidationErrors.noOfTicketsError = "field required";
                    formValid.noOfTicketsfield = false;
                } else if(value<1){
                    fieldValidationErrors.noOfTicketsError = "Number of tickets cannot be less than 1";
                    formValid.noOfTicketsfield = false;
                } else if(value>5){
                    fieldValidationErrors.noOfTicketsError = "You can book 5 tickets at a time";
                    formValid.noOfTicketsfield = false;
                } else {
                    fieldValidationErrors.noOfTicketsError = "";
                    formValid.noOfTicketsfield = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive =
          formValid.originfield &&
          formValid.destinationfield &&
          formValid.departureDatefield &&
          formValid.noOfTicketsfield
        this.setState({ formErrorMessage: fieldValidationErrors, formValid: formValid })
    };
    render(){
        if(this.state.availableFlights!=null){
            return <FlightDetails flightData={this.state.form} availableFlights={this.state.availableFlights}/>
        } else{
            return(
                <React.Fragment>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-4 offset-lg-1">
                                <div className="card bg-card text-light ">
                                    <div className="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="origin">Origin</label>
                                                <input type="text" name="origin" id="origin" className="form-control" placeholder="Origin" value={this.state.form.origin} onChange={this.handleChange}/>
                                                <span name="originError" className="text-danger">
                                                    {this.state.formErrorMessage.originError}
                                                </span>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="destination">Destination</label>
                                                <input type="text" name="destination" id="destination" className="form-control" placeholder="Destination" value={this.state.form.destination} onChange={this.handleChange}/>
                                                <span name="destinationError" className="text-danger">
                                                    {this.state.formErrorMessage.destinationError}
                                                </span>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="departureDate">Departure Date</label>
                                                <input type="date" name="departureDate" id="departureDate" className="form-control" value={this.state.form.departureDate} onChange={this.handleChange}/>
                                                <span name="departureDateError" className="text-danger">
                                                    {this.state.formErrorMessage.departureDateError}
                                                </span>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="noOfTickets">No Of Tickets</label>
                                                <input type="number" name="noOfTickets" id="noOfTickets" className="form-control" placeholder="No Of Tickets" value={this.state.form.noOfTickets} onChange={this.handleChange}/>
                                                <span name="noOfTicketsError" className="text-danger">
                                                    {this.state.formErrorMessage.noOfTicketsError}
                                                </span>
                                            </div>
                                            <button name="viewFlightsButton" type="submit" className="btn btn-primary btn-block" disabled={!this.state.formValid.buttonActive}>View Flights</button>
                                        </form>
                                        <span name="errorMessage" className="text-danger text-bold">
                                            {this.state.errorMessage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}