const collection = require('../utilities/connection');

const flightDb = [{
        routeId: "MB001",
        origin: "mumbai",
        destination: "bangalore",
        flightIds: ["GO-101", "UA-323", "SJ-432", "GI-427", "GI-439"],
        flightTimings: ["09:00-11:30", "04:00-07:00", "12:00-14:30", "18:00-20:30", "00:30-02:00"],
        prices: [2234, 2100, 3400, 4200, 2300],
    },
    {
        routeId: "BD001",
        origin: "bangalore",
        destination: "delhi",
        flightIds: ["GO-536", "UA-234", "UA-124", "GI-876"],
        flightTimings: ["09:00-12:30", "04:00-08:00", "12:00-15:30", "00:30-03:00"],
        prices: [3600, 3950, 3849, 4200],
    },
    {
        routeId: "DK001",
        origin: "delhi",
        destination: "kolkata",
        flightIds: ["GI-256", "GI-323", "SJ-896", "UA-427", "GO-439", "UA-543"],
        flightTimings: ["09:00-11:30", "04:00-07:00", "12:00-14:30", "18:00-20:30", "00:30-02:00", "09:00-11:30"],
        prices: [2234, 2100, 3400, 4200, 2300, 2235],
    },
    {
        routeId: "BM001",
        origin: "delhi",
        destination: "mumbai",
        flightIds: ["SJ-101", "SJ-323", "GI-432", "GA-427", "GI-986"],
        flightTimings: ["09:00-11:30", "04:00-07:00", "12:00-14:30", "18:00-20:30", "00:30-02:00"],
        prices: [2234, 2100, 3400, 4200, 2300],
    }
]
const bookingDB = [{
    bookingId: 1001,
    flightId: "SJ-101",
    departureDate: "03-04-2019",
    origin: "delhi",
    destination: "mumbai",
    timing: "09:00-11:30",
    charges: 4968,
    noOfTickets:2,
    passengerDetails: [{
            title: "Mr",
            firstName: "John",
            lastName: "Snow",
            age: 44
        },
        {
            title: "Ms",
            firstName: "Blake",
            lastName: "Snow",
            age: 16
        }
    ]
}]

exports.setupDb = () => {
    return collection.getBookingCollection().then((booking) => {
        return booking.deleteMany().then(() => {
            return booking.insertMany(bookingDB).then(() => {
                return collection.getFlightCollection().then((flights) => {
                    return flights.deleteMany().then(() => {
                        return flights.insertMany(flightDb).then((data) => {
                            if (data) return "Insertion Successfull"
                            else {
                                let err = new Error("Insertion failed");
                                err.status = 400;
                                throw err;
                            }
                        })
                    })
                })
            })
        })
    })
}