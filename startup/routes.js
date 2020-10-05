const error = require("../middleware/error");
const express = require("express");

module.exports = function (app) {
    app.use("/", require("../routes/home"));
    app.use("/api/genres", require("../routes/genres"));
    app.use("/api/movies", require("../routes/movies"));
    app.use("/api/rentals", require("../routes/rentals"));
    app.use('/api/customers', require("../routes/customers"));
    app.use("/api/user", require("../routes/user"));
    app.use("/api/auth", require("../routes/auth"));
    app.use(error);
    app.use(express.static("public"));
}