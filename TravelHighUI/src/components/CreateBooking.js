import React, { Component } from "react";
import axios from "axios";
import GetFlights from './GetFlights';
import BookingDetailsCard from './BookingDetailsCard';

const url = "http://localhost:1050/bookFlight/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetails: this.props.bookingDetails,
      passengerData: [],
      form: {
        firstName: "",
        lastName: "",
        title: "",
        age: ""
      },
      formErrorMessage: {
        firstNameError: "",
        lastNameError: "",
        ageError: ""
      },
      formValid: {
        firstName: false,
        lastName: false,
        age: false,
        buttonActive: false
      },
      errorMessage: "",
      successMessage: "",
      goBack: false
    };
  }

  book = () => {
    let bookingData = this.state.bookingDetails;
    bookingData.passengerDetails = this.state.passengerData;
    this.setState({ errorMessage: "", successMessage: "" })
    axios.post(url, bookingData)
      .then(response => {
        console.log(response.data)
        this.setState({ successMessage: response.data, errorMessage: "" });
      }).catch(error => {
        this.setState({ errorMessage: error.response.data.message, successMessage: "" });
      });
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
      case "firstName":
        const firstNameRegex = /^[A-Za-z]{1,15}$/
        if (value === "") {
          fieldValidationErrors.firstNameError = "field required";
          formValid.firstName = false;
        } else if (!value.match(firstNameRegex)) {
          fieldValidationErrors.firstNameError = "Please enter a valid first name";
          formValid.firstName = false;
        } else {
          fieldValidationErrors.firstNameError = "";
          formValid.firstName = true;
        }
        break;
      case "lastName":
        const lastNameRegex = /^[A-Za-z]{1,15}$/
        if (value === "") {
          fieldValidationErrors.lastNameError = "field required";
          formValid.lastName = false;
        } else if (!value.match(lastNameRegex)) {
          fieldValidationErrors.lastNameError = "Please enter a valid last name";
          formValid.lastName = false;
        } else {
          fieldValidationErrors.lastNameError = "";
          formValid.lastName = true;
        }
        break;
      case "age":
        if (value === "") {
          fieldValidationErrors.ageError = "field Required";
          formValid.age = false;
        } else if (value < 1 || value > 70) {
          fieldValidationErrors.ageError = "Sorry, age should be more than 1 year and less than 70 years";
          formValid.age = false;
        } else {
          fieldValidationErrors.ageError = "";
          formValid.age = true
        }
        break;
      default:
        break;
    }
    formValid.buttonActive =
      formValid.firstName &&
      formValid.lastName &&
      formValid.age
    this.setState({ formErrorMessage: fieldValidationErrors, formValid: formValid, successMessage: "" })
  };

  setPassengerData = () => {
    var newPassengerData = this.state.passengerData;
    newPassengerData.push(this.state.form)
    var resetForm = { firstName: "", lastName: "", title: "", age: "" }
    var resetValidField = { firstName: false, lastName: false, age: false, buttonActive: false }
    this.setState({ passengerData: newPassengerData, form: resetForm, formValid: resetValidField })
  }

  getPassengerData = () => {
    if (this.state.passengerData.length < Number(this.state.bookingDetails.noOfTickets)) {
      return (
        <React.Fragment>
          <div className="card bg-card text-light mb-4">
            <div className="card-body">
              <h6>Passenger {this.state.passengerData.length + 1}</h6>
              <div className="row">
                <div className="col-md-8">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select className="btn btn-light" name="title" id="title" onChange={this.handleChange} value={this.state.form.title}>
                        <option value="" disabled>Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                      </select>
                    </div>
                    <input type="text" className="form-control" name="firstName" id="firstName" value={this.state.form.firstName} onChange={this.handleChange} placeholder="First Name" />
                    <input type="text" className="form-control" name="lastName" id="lastName" value={this.state.form.lastName} onChange={this.handleChange} placeholder="Last Name" />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input type="number" className="form-control" name="age" id="age" value={this.state.form.age} onChange={this.handleChange} placeholder="Age" />
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <button name="addPassenger" className="btn btn-primary font-weight-bolder" disabled={!this.state.formValid.buttonActive} onClick={this.setPassengerData}>Add</button>
                </div>
              </div>
              <div className="text-danger">
                <div name="firstNameError">{this.state.formErrorMessage.firstNameError}</div>
                <div name="lastNameError">{this.state.formErrorMessage.lastNameError}</div>
                <div name="ageError">{this.state.formErrorMessage.ageError}</div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
  displayBookingSuccess = () => {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">
                  <h4 className="text-success">Booking successful with booking ID: {this.state.successMessage.bookingId}</h4>
                  <BookingDetailsCard bookingDetails={this.state.successMessage} />
                </div>
                <div className="card-footer">
                  <button name="homeButton" className="btn btn-warning btn-block" onClick={() => { this.setState({ goBack: true }) }}>Home</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  render() {
    if (this.state.goBack) {
      return <GetFlights></GetFlights>
    }
    if (this.state.successMessage === "") {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-7">
              {
                this.state.passengerData.length > 0 ? (
                  this.state.passengerData.map((passenger, index) => {
                    return (
                      <div className="card bg-card text-light mb-4" key={index}>
                        <div className="card-body">
                          <div className="text-custom">Passenger {index + 1}</div>
                          <h4>{passenger.title} {passenger.firstName} {passenger.lastName}, {passenger.age}</h4>
                        </div>
                      </div>
                    )
                  })
                ) : null
              }
              {this.getPassengerData()}
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div name="flightDetails" className="card bg-card text-light">
                <div className="card-body">
                  <BookingDetailsCard bookingDetails={this.state.bookingDetails} />
                </div>
                <div className="card-footer">
                  <button name="bookButton" className="btn btn-primary btn-block" disabled={!(Number(this.state.bookingDetails.noOfTickets) === this.state.passengerData.length)} onClick={this.book}>Book</button>
                  <button name="homeButton" className="btn btn-warning btn-block" onClick={() => { this.setState({ goBack: true }) }}>Home</button>
                  <span className="text-danger">{this.state.errorMessage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return this.displayBookingSuccess();
    }
  }
}

export default CreateBooking;