const express = require('express');
const router = express.Router();
const { getAllGenres, getGenreById, getGenreByName, updateGenreById, deleteGenreByName, createGenre, validate, createMovie } = require('./database.js');
const { Genre } = require('../models/genre');

var staticId = 5;

router.get('/', async (req, res) => {
    let display_courses = [];

    try {
        let courses = await getAllGenres();

        for (field of courses) {
            display_courses.push({ "name": field.name, "id": field.id });
        }
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }

    res.send(display_courses);
});

router.get('/:id', async (req, res) => {

    try {
        let genre_search = await getGenreById(req.params.id);
        if (genre_search != null) {
            res.send(genre_search[0]);
        } else {
            res.status(404).send('The genre with the given id was not found');
        }
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
});

router.put('/:id', async (req, res) => {

    try {
        let genre_search = await updateGenreById(req.params.id, req.body.name);
        if (genre_search != null) {
            res.send(genre_search);
        } else {
            res.status(404).send("The genre with the given id was not found");
        }
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
});

router.post('/', async (req, res) => {
    try {

        let { error } = validate(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
        }

        let find_Genre = await getGenreByName(req.body.name);

        if (find_Genre != false) { res.status(404).send('Genre already exist'); }
        else {
            let new_Genre = await createGenre(req.body.name);
            console.log('No genre named ' + new_Genre.name + ' was found. Genrelist updated...');
            res.redirect('/api/genres');
        }

        res.redirect('/api/genres');

    } catch (err) {
        for (field in err.errors)
            res.send(err.errors[field].message);
    }
});

router.delete('/', async (req, res) => {
    try {
        let searchResult = await deleteGenreByName(req.body.name);

        if (searchResult == false) {
            res.status(404).send(`${req.body.name} does not exist`);
        } else {

            res.send('Genre successfully removed');
            //res.redirect('/api/genres');
        }
    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
});


//createMovie("Atlantis", new Genre({id: 5, name: "Adventure"}), 0, 0);

module.exports = router;