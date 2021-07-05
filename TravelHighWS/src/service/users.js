const db = require('../model/users');
const validator = require('../utilities/validator');
const exec = require('child-process-promise').exec;
const fs = require('fs');
const path = require("path")
const parser = require("./parser");

let fBookingService = {}

fBookingService.evaluate = () => {
    evaluationPath = path.join(__dirname, "../../../SkyTracksUI");
    console.log("Begin testing!!");
    return exec(`cd ${evaluationPath} && npm test`)
        .then((response) => {
            let content = fs.readFileSync("../../SkyTracksUI/testReport.json", 'utf8');
            return parser.generateTestReport(content);
        }).catch((err) => {
            let content = fs.readFileSync("../../flight-booking/testReport.json", 'utf8');
            return parser.generateTestReport(content);
        })
}


fBookingService.getFlightOnRoute = (origin, destination) => {
    return db.getFlightOnRoute(origin.toLowerCase(), destination.toLowerCase()).then(availableFlights => {
        if (availableFlights == null) {
            let err = new Error("Sorry! No flights available from " + origin + " to " + destination);
            err.status = 404;
            throw err;
        } else {
            return availableFlights;
        }
    })
}

fBookingService.getBooking = (bookingId) => {
    return db.getBooking(bookingId).then((bookingDetails) => {
        if (bookingDetails === null) {
            let err = new Error("No Bookings is found for booking ID: " + bookingId);
            err.status = 404;
            throw err;
        } else {
            return bookingDetails;
        }
    })
}

fBookingService.bookFlight = (bookingDetails) => {
    return db.bookFlight(bookingDetails).then((bookingData) => {
        if (bookingData == null) {
            let err = new Error("Booking failed");
            err.status = 400;
            throw err;
        } else return bookingData
    })
}


module.exports = fBookingService;