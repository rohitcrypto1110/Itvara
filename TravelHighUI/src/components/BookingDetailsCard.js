import React from "react";

export default function BookingDetailsCard(props){
    return(
        <React.Fragment>
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
        </React.Fragment>
    )
}