const { logger } = require("./logger");
require('dotenv').config();


module.exports = function () {
    if (!config.get('jwtPrivateKey')) { logger.error('FATAL ERROR: jwt is not defined'); process.exit(1); }
};