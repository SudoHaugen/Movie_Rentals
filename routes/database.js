const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');

async function createGenre(genrename) {
    const genre = new Genre({
        name: genrename
    });

    //Alternative approach for validation with callbacks
    /* await course.validate((err) => {
            
    }); */

    try {
        await genre.save();
        return genre;
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
};

/* async function createCourse(genrename) {
    const genre = new Genre({
        id: genreid,
        name: genrename
    });
    genreid++;  

    //Alternative approach for validation with callbacks
    // await course.validate((err) => {
            
    //});

    try {
        let result = await genre.save();
        return result;
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
} */

async function getAllGenres() {
    let search_result = await Genre.find();

    return search_result;
}

async function getGenreByName(genrename) {
    let search_result = await Genre
        .find({ name: genrename });

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

async function getGenreById(genre_id) {

    let search_result = await Genre
        .find({ id: genre_id })
        .select({ name: 1, _id: 0, id: 1 });
    //.lean();  

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

async function updateGenreById(genre_id, document_name) {
    let filter = { id: genre_id };
    let update = { name: document_name };
    let search_result = await Genre
        .findOneAndUpdate(filter, update, {
            new: true
        });

    if (!search_result) {
        return false;
    } else {
        return await search_result;
    }
}

async function deleteGenreByName(document_name) {
    let search_result = await Genre
        .findOneAndDelete({ name: document_name });

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
}

/* async function getGenre(genre_name) {
    let search_result = await Genre
        .find({ name: /genre_name/i })

    if (!search_result) {
        return false;
    } else {
        return true;
    }
} */

exports.createGenre = createGenre;
exports.getAllGenres = getAllGenres;
exports.getGenreByName = getGenreByName;
exports.getGenreById = getGenreById;
exports.updateGenreById = updateGenreById;
exports.deleteGenreByName = deleteGenreByName;
exports.validateGenre = validateGenre;