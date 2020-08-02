const express = require("express");
const mongoose = require("mongoose");
const { Genre, genreschema } = require("../models/genre");
const { Movie, validate } = require("../models/movies");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  let { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);

  if (!genre) {
    return res.status(400).send("Invalid genre.");
  }

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();

  res.send(movie);
});

module.exports = router;
