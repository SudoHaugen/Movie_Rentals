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

 router.get('/', async (req, res) => {
     let display_courses = [];

     try {
        let courses = await test.getAllCourses();
        for (field of courses) {
            display_courses.push({"name": field.name, "id": field.id});
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
        let genre_search = await test.getGenreById(req.params.id);
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
        let genre_search = await test.updateGenreById(req.params.id, req.body.name);
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
        let find_Genre = await test.getGenreByName(req.body.name);

        if (find_Genre == true) {res.status(404).send('Genre already exist');}
        else {
            let new_Genre = await test.createCourse(req.body.name);
            console.log(new_Genre);
        }

        let { error } = validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        }
    
        res.send(genres);

    } catch (err) {
        for (field in err.errors)
            console.log(err.errors[field].message);
            return null;
    }
});

router.delete('/', async (req, res) => {
    try {
        let searchResult = await test.deleteGenreByName(req.body.name);
        console.log(searchResult);

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

function validate(inputGenre) {
    let schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(inputGenre, schema);
}

module.exports = router;