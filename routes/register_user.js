const express = require("express");
const { User, validateUser } = require("../models/user");
const router = express.Router();
const { isEmail } = require('validator'); //As Joi does not support any good email validations we have to use another String validator

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message) || !isEmail(req.body.email);

    let new_user = await User.findOne({ email: req.body.email });
    if (new_user !== null) return res.status(400).send("Email address already exists...");

    try {
        new_user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await new_user.save();
        res.status(200).send(new_user);
    } catch (err) {
        for (field in err.errors) console.log(err.errors[field].message);
        res.sendStatus(400);
    }
});

module.exports = router;