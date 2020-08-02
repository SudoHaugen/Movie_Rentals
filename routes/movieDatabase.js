const mongoose = require('mongoose');
const express = require('express');
const { Genre } = require('../models/genre');
const { Movie } = require('../models/movies');
const router = express.Router();

async function createMovie(movieField) {
    let genre = await Genre.findById(movieField.genreId);

    if (!genre) {
        return res.status(400).send("Invalid genre.");
    }

    let movie = new Movie({
        title: movieField.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numbersInStock: movieField.numbersInStock,
        dailyRentalRate: movieField.dailyRentalRate,
    });

    movie = await movie.save();
    return movie;
}

async function getMovieByTitle(title_input) {
    let search_result = await Movie
        .find({ title: title_input })
        .select('-_id title genre.name numbersInStock dailyRentalRate');

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

//Make functions for finding movies with object id reference



exports.createMovie = createMovie;
exports.getMovieByTitle = getMovieByTitle;