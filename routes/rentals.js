const express = require("express");
const mongoose = require("mongoose");
const { getMovieById } = require("./movieDatabase");
const { createRentals, getAllRentals, deleteRentalByName } = require('./rentalsDatabase');
const { Customer } = require('../models/customer');   
const { Rental } = require('../models/rentals');
const { validate } = require("joi");
const Fawn = require('fawn');
const router = express.Router();


Fawn.init(mongoose);


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerID);
    if (!customer) return res.status(400).send('Invalid customer id');

    const movie = await getMovieById(req.body.movieID);
    if (!movie) return res.status(400).send("Error: Requested movie not found.");

    console.log(movie);

    if (movie.numbersInStock === 0) return res.status(400).send('Movie is not available at this moment');

    let rental = new Rental ({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    console.log(movie._id);

    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
            $inc: { numbersInStock: -1 }
        })
        .run();

        res.send(rental);
    } catch(ex) {
        res.status(500).send('Something failed');
    }
});

router.get('/', async (req, res) => {
    let rentals = await getAllRentals();
    let display_rentals = [];

    try {
        for (field of rentals) {
            display_rentals.push({ "Movie": field.movie.title, "Rental start date": field.rental_start, "Rental end date": field.rental_end });
        }
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }

    res.send(rentals);
});

router.delete('/', async (req, res) => {
    try {
        let searchResult = await deleteRentalByName(req.body.movie);

        if (searchResult === false) {
            res.status(404).send(`${req.body.movie} does not exist`);
        } else {
            res.send('Rental successfully removed');
        }
    } catch (err) {
        for (field in err.errors) console.log(err.erros[field].message);
        return null;
    }
});

module.exports = router;