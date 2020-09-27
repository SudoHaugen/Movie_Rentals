const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user === null) return res.status(400).send("Invalid email or Password");

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) return res.status(400).send("Invalid email or Password");

        const token = user.generateAuthToken();

        res.send(token);
    } catch (err) {
        for (field in err.errors) console.log(err.errors[field].message);
        res.sendStatus(400);
    }
});

function validateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}
module.exports = router;