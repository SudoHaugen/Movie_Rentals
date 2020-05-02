const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
var staticId = 0;

mongoose.connect(('mongodb://localhost/Vidly'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

    var methods = {};

const genreschema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

const Genre = mongoose.model('Genre', genreschema);

methods.createCourse = async function (genrename) {
    const genre = new Genre({
        id: staticId,
        name: genrename
    });
    staticId++;  

    //Alternative approach for validation with callbacks
    /* await course.validate((err) => {
            
    }); */

    try {
        let result = await genre.save();
        return result;
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

methods.getAllCourses = async function() {
    let display_courses = {};
    let search_result = await Genre
    .find();

    return search_result;
}

methods.getGenreByName = async function(genrename) {
    let search_result = await Genre
    .find({ name: genrename });
    
    if (!search_result) {
        return true;
    } else {
        return search_result;
    }
}

methods.getGenreById = async function(genre_id) {
    let search_result = await Genre
        .find({ id: genre_id })
        .select({ name: 1, _id: 0, id: 1 });
        //.lean();  

    if (!search_result) {
        return false;
    } else {
        return search_result;
    }
};

/* async function getGenre(genre_name) {
    let search_result = await Genre
        .find({ name: /genre_name/i })

    if (!search_result) {
        return false;
    } else {
        return true;
    }
} */

module.exports = methods;