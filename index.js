const express = require("express");
const app = new express();
const port = process.env.PORT || 8080;
const { logger } = require("./startup/logger");

require("./startup/routes")(app);
require('./startup/db')(app);
require('./startup/config');
require('./startup/validation')();
require('./startup/requestParser')(app);
require('./startup/http_security_header')(app);

app.set('port', process.env.PORT || 8080);

process.setMaxListeners(20); //Increase max amount of listeners due to possible memory leak

app.listen(port, () => logger.info(`Listening on port ${port}`));