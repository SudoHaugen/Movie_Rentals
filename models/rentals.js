const mongoose = require("mongoose");
const { movieschema } = require("./movies");


const rentalScheme = new mongoose.Schema({
    movie: {
        type: movieschema,
        required: true
    },
    rental_start: {
        type: Date,
        required: true
    },
    rental_end: {
        type: Date,
        required: true
    }
});

const Rental = mongoose.model("Rental", rentalScheme);

exports.Rental = Rental;