const mongoose = require('mongoose');
const Joi = require('joi');

const genreschema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

const Genre = mongoose.model('Genre', genreschema);

function validate(inputGenre) {
    let schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(inputGenre, schema);
}

exports.Genre = Genre;
exports.genreschema = genreschema;
exports.validate = validate;