const mongoose = require("mongoose");
const { movieschema } = require("./movies");


const Rental = mongoose.model("Rental", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyrentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true,
    },
    rental_start: {
        type: Date,
        required: true,
        default: Date.now
    },
    rental_end: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = {
        customerID: Joi.string().required(),
        movieID: Joi.string().required()
    };

    return Joi.validate(retal, schema);
}

exports.Rental = Rental;
exports.validateRental = validateRental;