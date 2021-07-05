import React from "react";
import { shallow } from "enzyme";
import CreateBooking from "../components/CreateBooking";
import GetFlights from '../components/GetFlights';
import FlightDetails from '../components/flightDetails';
import GetBooking from "../components/GetBookings";

// -----------------------------------------------------------------------------------
describe("GET FLIGHT COMPONENT", () => {
  test("GFST1-GetFlight Component has a form has 4 input fields with proper name attribute",()=>{
    const wrapper = shallow(<GetFlights></GetFlights>);
    var correctInput = false;
    if(wrapper.find('form').length === 1 
      && wrapper.find("form").find("input").length === 4
      && wrapper.find("form").find("input").at(0).props().name == "origin"
      && wrapper.find("form").find("input").at(1).props().name == "destination"
      && wrapper.find("form").find("input").at(2).props().name == "departureDate"
      && wrapper.find("form").find("input").at(3).props().name == "noOfTickets" ){
        correctInput = true;
      }
    expect(correctInput).toEqual(true)
  })
  test("GFST2-GetFlight Component has proper name attribute for error messages",()=>{
    const wrapper = shallow(<GetFlights></GetFlights>);
    var correctInput = false;
    if(wrapper.find('[name="originError"]').length === 1 
        &&  wrapper.find('[name="destinationError"]').length === 1
        && wrapper.find('[name="departureDateError"]').length === 1
        && wrapper.find('[name="noOfTicketsError"]').length === 1
        && wrapper.find('[name="errorMessage"]').length === 1){
        correctInput = true;
      }
    expect(correctInput).toEqual(true)
  })
  test("GFST3-GetFlight Component has a View Flights with the proper name attribute",()=>{
    const wrapper = shallow(<GetFlights></GetFlights>);
    expect(wrapper.find('button[name="viewFlightsButton"]')).toHaveLength(1)
  })
})

const availableFlights = {
  routeId: "MB001",
  origin: "mumbai",
  destination: "bangalore",
  flightIds: ["GO-101", "UA-323", "SJ-432", "GI-427", "GI-439"],
  flightTimings: ["09:00-11:30", "04:00-07:00", "12:00-14:30", "18:00-20:30", "00:30-02:00"],
  prices: [2234, 2100, 3400, 4200, 2300],
}
const flightData = {
  origin: "Mumbai",
  destination: "Bangalore",
  departureDate: "2020-02-02",
  noOfTickets: 1
}

describe("FLIGHT DETAILS COMPONENT",()=>{
  test("FDST1-Flight Details has h4 tags that display the flight data entered by user",()=>{
    const wrapper = shallow(<FlightDetails flightData={flightData} availableFlights={availableFlights}/>);
    var correctOutput = false;
    if(wrapper.find('h4').at(0).props().children===flightData.departureDate
      && wrapper.find('h4').at(1).props().children[0]===flightData.origin
      && wrapper.find('h4').at(1).props().children[2]===flightData.destination
      && Number(wrapper.find('h4').at(2).props().children[0])==flightData.noOfTickets){
        correctOutput = true
      }
    expect(correctOutput).toEqual(true)
  })
  test("FDST2-Flight Details has cards to display the details of available flights",()=>{
    const wrapper = shallow(<FlightDetails flightData={flightData} availableFlights={availableFlights}/>);
    var correctOutput = 0;
    availableFlights.flightIds.forEach((flightId,index)=>{
      if(wrapper.find('div[className="card-body"]').at(index+1).contains(flightId)
        && wrapper.find('div[className="card-body"]').at(index+1).contains(availableFlights.flightTimings[index])
        && wrapper.find('div[className="card-body"]').at(index+1).contains(availableFlights.prices[index])
        && wrapper.find('div[className="card-body"]').at(index+1).contains(availableFlights.prices[index]*flightData.noOfTickets)){
          correctOutput+=1
        }
    })
    expect(availableFlights.flightIds.length).toEqual(correctOutput)
  })
  test("FDST3-Flight Details has an add passenger details buttons with each available flight card and a back button",()=>{
    const wrapper = shallow(<FlightDetails flightData={flightData} availableFlights={availableFlights}/>);
    var correctOutput = false;
    if(wrapper.find('button[name="goBack"]').length===1
      && wrapper.find('button[name="addPassenger"]').length === availableFlights.flightIds.length){
        correctOutput=true;
      }
    expect(correctOutput).toEqual(true)
  })
})
const bookingDetails={
  origin:"Mumbai",
  destination:"Bangalore",
  departureDate:"2020-02-02",
  noOfTickets:2,
  flightId:"UA-323",
  timing:"04:00-07:00",
  charges:4200
}
const successMessage = {
  bookingId: 1002,
  flightId: "GO-101",
  departureDate: "2020-02-02",
  origin: "Mumbai",
  destination: "Bangalore",
  timing: "09:00-11:30",
  charges: 2234,
  passengerDetails: [
    {
      firstName: "Nicky",
      lastName: "Prusty",
      title: "Ms.",
      age: "23"
    }
  ]
  }
describe("CREATE BOOKING COMPONENT",()=>{
  test("CBST1-Create Booking has a flightDetails card to display the flight details choosen by the user",()=>{
    const wrapper = shallow(<CreateBooking bookingDetails={bookingDetails}/>)
    expect(wrapper.find('BookingDetailsCard').props().bookingDetails == bookingDetails).toEqual(true)
  })
  test("CBST2-Create Booking has a flightDetails card that has a book and a home button with proper name attribute",()=>{
    const wrapper = shallow(<CreateBooking bookingDetails={bookingDetails}/>)
    var correctOutput = false;
    if(wrapper.find('div[name="flightDetails"]').find('button[name="bookButton"]').length === 1
      && wrapper.find('div[name="flightDetails"]').find('button[name="homeButton"]').length === 1){
      correctOutput = true
    }
    expect(correctOutput).toEqual(true)
  })
  test("CBST3-Create Booking has select dropdown and input fields with proper name attributes",()=>{
    const wrapper = shallow(<CreateBooking bookingDetails={bookingDetails}/>)
    var correctOutput = false;
    if(wrapper.find('select[name="title"]').length===1
      && wrapper.find('input[name="firstName"]').length ===1
      && wrapper.find('input[name="lastName"]').length ===1
      && wrapper.find('input[name="age"]').length ===1){
      correctOutput = true
    }
    expect(correctOutput).toEqual(true)
  })
  test("CBST4-Create Booking component has an add buttton to add passenger details with proper name attribute",()=>{
    const wrapper = shallow(<CreateBooking bookingDetails={bookingDetails}/>)
    expect(wrapper.find('button[name="addPassenger"]').length).toEqual(1)
  })
  test("CBST5-Create Booking component has a card to display the booking details in the success message",()=>{
    const wrapper = shallow(<CreateBooking bookingDetails={bookingDetails}/>)
    wrapper.setState({successMessage:successMessage});
    expect(wrapper.find('BookingDetailsCard').props().bookingDetails == successMessage).toEqual(true)
  })
  test("CBST6-Create Booking component has a home button in the success message card with proper name attribute",()=>{
    const wrapper = shallow(<CreateBooking bookingDetails={bookingDetails}/>);
    wrapper.setState({successMessage:successMessage});
    expect(wrapper.find('button[name="homeButton"]').length).toEqual(1)
  })
})
describe("GET BOOKING COMPONENT",()=>{
  test("GBST1-Get Booking component has a form with a input field with proper name attribute",()=>{
    const wrapper = shallow(<GetBooking/>);
    expect(wrapper.find('form').find('input[name="bookingId"]').length).toEqual(1);
  })
  test("GBST2-Get Booking component has a View Details button with proper name attrbute",()=>{
    const wrapper = shallow(<GetBooking/>);
    expect(wrapper.find('button[name="viewDetails"]').length).toEqual(1);
  })
  test("GBST2-Get Booking component displays the booking details in the card body",()=>{
    const wrapper = shallow(<GetBooking/>);
    wrapper.setState({bookingData:successMessage})
    expect(wrapper.find('BookingDetailsCard').props().bookingDetails == successMessage).toEqual(true)
  })
})