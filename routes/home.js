const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;


/**
 * Added a new Test comment for home router
 */