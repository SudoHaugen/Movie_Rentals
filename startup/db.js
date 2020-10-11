const mongoose = require('mongoose');
const { logger } = require("./logger.js");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require('config');

module.exports = function (app) {
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info(`Connected to ${db}...`));

    if (app.get("env") === "development") {
        app.use(morgan(':method :url :status - :response-time ms'));
        startupDebugger("Morgan enabled for active logging...");
    }

    // Db work
    dbDebugger("Connected to the database...");
};