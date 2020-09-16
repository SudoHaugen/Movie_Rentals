const mongoose = require("mongoose");
const { Genre, genreschema } = require("./genre");
const Joi = require("joi");

const movieschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'genres',
      required: true,
  },
  numbersInStock: {
    required: true,
    type: Number,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    required: true,
    type: Number,
    min: 0,
    max: 255,
  },
});

//Validerer kun brukerinput
//Har ingenting å gjøre med den faktiske modellen for filmer
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.string().min(5).max(50).required(),
    numbersInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  };

  return Joi.validate(movie, schema);
}

const Movie = mongoose.model("Movie", movieschema);

exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.movieschema = movieschema;