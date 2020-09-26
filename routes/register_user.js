const express = require("express");
const { User, validateUser } = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let new_user = await User.findOne({ email: req.body.email });
        if (new_user !== null) return res.status(400).send("Email address already exists...");

        new_user = new User(_.pick(req.body, ['name', 'email']));
        const salt = await bcrypt.genSalt(10);
        new_user.password = await bcrypt.hash(req.body.password, salt);

        await new_user.save();
        res.status(200).send(_.pick(new_user, ['_id', 'name', 'email']));
    } catch (err) {
        for (field in err.errors) console.log(err.errors[field].message);
        res.sendStatus(400);
    }
});

module.exports = router;