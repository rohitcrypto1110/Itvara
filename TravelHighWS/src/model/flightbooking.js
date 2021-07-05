class FlightBooking {
    constructor(obj) {
        this.bookingId = obj.bookingId;
        this.flightId = obj.flightId;
        this.departureDate = obj.departureDate;
        this.origin = obj.origin;
        this.destination = obj.destination;
        this.timing = obj.timing;
        this.charges = obj.charges;
        this.noOfTickets = obj.noOfTickets;
        this.passengerDetails = obj.passengerDetails;
    }
}

module.exports = FlightBooking;