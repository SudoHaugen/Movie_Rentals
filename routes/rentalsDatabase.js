const mongoose = require('mongoose');
const express = require('express');
const { Rental } = require('../models/rentals');

async function createRentals(movie, start_date, end_date) {
    let rental = new Rental({
        movie: {
            //_id: movie._id,
            title: movie.title,
            genre: movie.genre,
            numbersInStock: movie.numbersInStock,
            dailyrentalRate: movie.dailyRentalRate
        },
    });

    return await rental.save();
}

async function getAllRentals() {
    let search_result = await Rental.find().sort('-dateout');

    return search_result;
}

async function deleteRentalByName(document_name) {
    let search_result = await Rental
        .findOneAndDelete({ 'movie.title': document_name });

    console.log("Came here");
    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

exports.createRentals = createRentals;
exports.getAllRentals = getAllRentals;
exports.deleteRentalByName = deleteRentalByName;