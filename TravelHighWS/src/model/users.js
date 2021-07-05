const dbModel = require('../utilities/connection');

const flightBookingDb = {}

flightBookingDb.generateId = () => {
    return dbModel.getBookingCollection().then((booking) => {
        return booking.distinct("bookingId").then((ids) => {
            let bId = Math.max(...ids);
            return bId + 1;
        })
    })
}

flightBookingDb.getFlightOnRoute = (origin, destination) => {
    return dbModel.getFlightCollection().then(model => {
        return model.find({ "origin": origin, "destination": destination }, { _id: 0 }).then(availableFlights => {
            if (availableFlights.length > 0) return availableFlights;
            else return null;
        })
    })
}
flightBookingDb.getBooking = (bookingId) => {
    return dbModel.getBookingCollection().then((model) => {
        return model.find({ "bookingId": bookingId }, { _id: 0 }).then((bookings) => {
            if (!bookings || bookings.length == 0) return null;
            else return bookings;
        })
    })
}
flightBookingDb.bookFlight = (bookingDetails) => {
    return dbModel.getBookingCollection().then((model) => {
        return flightBookingDb.generateId().then((newBookingId) => {
            bookingDetails.bookingId = newBookingId;
            return model.insertMany([bookingDetails]).then((data) => {
                if (data.length != 0) {
                    return bookingDetails
                } else {
                    return null
                }
            })
        })
    })
}

module.exports = flightBookingDb;