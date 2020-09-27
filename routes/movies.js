const auth = require('../middleware/auth');
const express = require("express");
const mongoose = require("mongoose");
const { Genre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movies");
const { createMovie, getMovieByTitle, getMovieByName, updateMovieByName, deleteMovieByName } = require("./movieDatabase");
const router = express.Router();

router.get("/", async (req, res) => {

  try {
    const queryResult = await Movie.find()
      .select('-_id title genre.name numbersInStock dailyRentalRate')
      .sort({ 'title': 'asc' });
    res.send(queryResult);
  } catch (err) {
    for (field in err.errors) console.log(err.errors[field].message);
    res.sendStatus(404);
  }
});

router.post("/", auth, async (req, res) => {
  let { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send('Invalid Genre');

  try {
    await createMovie(req.body);
    res.redirect(200, '/movies');
  } catch (err) {
    for (field in err.errors) console.log(err.errors[field].message);
    return res.sendStatus(400);
  }
});

router.get('/:title', async (req, res) => {
  try {
    let movie_search = await getMovieByTitle(req.params.title);

    if (movie_search != null) {
      res.send(movie_search[0]);
    } else {
      res.status(404).send('The movie with the given title was not found');
    }
  } catch (err) {
    for (field in err.errors)
      console.log(err.errors[field].message);
    return null;
  }
});

router.put('/:title', auth, async (req, res) => {
  console.log(req.params.title, req.body.title);
  try {
    let movie_search = await updateMovieByName(req.params.title, req.body.title);
    if (movie_search != null) {
      res.send(movie_search);
    } else {
      res.status(404).send("The movie with the given title was not found");
    }
  } catch (err) {
    for (field in err.errors)
      console.log(err.errors[field].message);
    return null;
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    let searchResult = await deleteMovieByName(req.body.title);

    if (searchResult == false) {
      res.status(404).send(`${req.body.title} does not exist`);
    } else {

      res.send('Movie successfully removed').redirect('/api/genres');
    }
  } catch (err) {
    for (field in err.errors)
      console.log(err.errors[field].message);
    return null;
  }
});

module.exports = router;
