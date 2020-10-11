const express = require("express");
const winston = require("winston");
const app = new express();
const port = process.env.PORT || 8080;
const { logger } = require("./startup/logger");

require('dotenv').config();
require('./startup/db')(app);
require('./startup/requestParser')(app);
require('./startup/config');
require("./startup/routes")(app);
require('./startup/validation')();
require('./startup/http_security_header')(app);

app.set('port', process.env.PORT || 8080);

process.on("uncaughtException", () => {
    console.log("Error occured during startup. Logging event and shutting down...");
});

process.setMaxListeners(20); //Increase max amount of listeners due to possible memory leak

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

module.exports = server;