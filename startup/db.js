const mongoose = require('mongoose');
const { logger } = require("./logger.js");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

module.exports = function (app) {
    mongoose.connect(('mongodb://localhost/Vidly'), { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => logger.info('Connected to MongoDB...'));

    if (app.get("env") === "development") {
        app.use(morgan({ format: 'dev', immediate: true }));
        startupDebugger("Morgan enabled for active logging...");
    }

    // Db work
    dbDebugger("Connected to the database...");
};