const express = require("express");
const mongoose = require("mongoose");
const { getMovieByTitle } = require("./movieDatabase");
const { createRentals, getAllRentals, deleteRentalByName } = require('./rentalsDatabase')
const router = express.Router();


router.post('/', async (req, res) => {
    let movie = await getMovieByTitle(req.body.movie);
    if (!movie) return res.status(400).send("Error: Requested movie not found.");
    let start_date = new Date();
    let end_date = new Date();
    end_date.setDate(start_date.getDate() + 14);

    let rental = await createRentals(movie, start_date, end_date);

    if (rental == false) {
        res.status(400).send("Something went wrong...");
    } else {
        res.status(200).send("Successfully added movie rentals");
    }

});

router.get('/', async (req, res) => {
    let display_rentals = [];

    try {
        let rentals = await getAllRentals();

        /*for (field of rentals) {
            display_rentals.push({ "Movie": field.movie.title, "Rental start date": field.rental_start, "Rental end date": field.rental_end });
        }*/
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