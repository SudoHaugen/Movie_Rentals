const mongoose = require("mongoose");
const Joi = require("Joi");
const { Genre, genreschema } = require("./genre");

const movieschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreschema, //Hvorfor referer vi til schema istedenfor model?
    required: true,
  },
  numbersInStock: Number,
  dailyRentalRate: Number,
});

//Validerer kun brukerinput
//Har ingenting å gjøre med den faktiske modellen for filmer
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numbersInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

  return Joi.validate(movie, schema);
}

const Movie = mongoose.model("Movie", movieschema);

exports.Movie = Movie;
exports.validate = validateMovie;
