const express = require('express');
const router = express.Router();
const Joi = require('joi');
const test = require('./database.js');
var staticId = 5;

let genres = [
    {
        "id": 0,
        "name": "Action"
    },
    {
        "id": 1,
        "name": "Drama"
    },
    {
        "id": 2,
        "name": "Horror"
    },
    {
        "id": 3,
        "name": "Comedy"
    },
    {
        "id": 4,
        "name": "Sitcom"
    }
];

 router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    let courseId = req.params.id;
    //if (res.status(404).send('Course not found'));
    res.send(genres[courseId].name);
});

router.put('/:id', (req, res) => {
    //Check if genres exist - throw err 404 if it dosent
    let genresId = genres.find(c => c.id === parseInt(req.params.id));
    if (!genresId) res.status(404).send('The genre with the given id was not found');

    let { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update genre description
    genresId.name = req.body.name;
    res.send(genresId); 
});

router.post('/', (req, res) => {
    let find_Genre = getGenre(req.body.name);
    if (find_Genre == true) res.status(404).send('Genre already exist');

    let { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let new_Genre = createCourse(req.body.name);
    console.log(new_Genre);

    res.send(genres);
});

router.delete('/', (req, res) => {
    let searchResult = genres.find(c => c.name == req.body.name);
    if (searchResult !== undefined) {
        genres.splice(genres.indexOf(searchResult), 1);
    } else {
        res.send('Sorry the requested genre does not exist...');
    }

    res.send(genres);
});

function validate(inputGenre) {
    let schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(inputGenre, schema);
}

module.exports = router;