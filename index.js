const config = require('config');
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = new express();
const port = process.env.PORT || 8080;
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const mongoose = require("mongoose");

if (!config.get('jwtPrivateKey')) { console.log('FATAL ERROR: jwt is not defined'); process.exit(1); }

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled for active logging...");
}

mongoose.connect(('mongodb://localhost/Vidly'), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

// Db work
dbDebugger("Connected to the database...");

app.use(helmet());
app.use(jsonParser);
app.use(urlencodedParser);
app.use("/", require("./routes/home"));
app.use("/api/genres", require("./routes/genres"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rentals", require("./routes/rentals"));
app.use('/api/customers', require("./routes/customers"));
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use(express.static("public"));

app.listen(port);