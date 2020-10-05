const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { getAllGenres, getGenreById, getGenreByName, updateGenreById, deleteGenreByName, createGenre, validateGenre } = require('./database.js');

router.get('/', async (req, res) => {
    throw new Error("LEL!");
    let display_courses = [];
    let courses = await getAllGenres();

    for (let field of courses) {
        display_courses.push({ "name": field.name });
    }
    res.send(display_courses);
});

router.get('/:name', async (req, res) => {

    let genre_search = await getGenreById(req.params.name);
    if (genre_search != null) {
        res.send(genre_search[0]);
    } else {
        res.status(404).send('The genre with the given id was not found');
    }
});

router.put('/:id', auth, async (req, res) => {

    try {
        let genre_search = await updateGenreById(req.params.id, req.body.name);
        if (genre_search != null) {
            res.send(genre_search);
        } else {
            res.status(404).send("The genre with the given id was not found");
        }
    } catch (err) {
        for (let field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
});

router.post('/', auth, async (req, res) => {
    try {

        let { error } = validateGenre(req.body);

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
        for (let field in err.errors)
            res.send(err.errors[field].message);
    }
});

router.delete('/', [auth, admin], async (req, res) => {
    try {
        let searchResult = await deleteGenreByName(req.body.name);

        if (searchResult == false) {
            res.status(404).send(`${req.body.name} does not exist`);
        } else {

            res.send('Genre successfully removed');
            //res.redirect('/api/genres');
        }
    } catch (err) {
        for (let field in err.errors)
            console.log(err.errors[field].message);
        return null;
    }
});

module.exports = router;