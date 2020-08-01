const mongoose = require('mongoose');
const {Genre, genreschema} = require('./genre');

const movieschema = new mongoose.Schema({
    title: String,
    Genre: genreschema, //Hvorfor referer vi til schema istedenfor model?
    numbersInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('Movie', movieschema);

exports.Movie = Movie;