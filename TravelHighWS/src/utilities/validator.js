let Validator = {};

Validator.validateFlightId = function (flightId) {
    let pattern = new RegExp("^IND-[1-9][0-9]{2}$");
    if (flightId.length != 7 && !(pattern.test(flightId))) {
        let err = new Error("Error in flight Id");
        err.status = 406
        throw err;
    }
}

// structural test is written only for validateBookingId
Validator.validateBookingId = function (bookingId) {
    if (new String(bookingId).length != 4) {
        let err = new Error("Error in booking Id");
        err.status = 406;
        throw err;
    }
}

module.exports = Validator;