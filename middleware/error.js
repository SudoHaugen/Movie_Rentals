const { logger } = require('../startup/logger');

module.exports = function (err, req, res, next) {
    logger.error(err.message, { metadata: err.stack });
    res.status(500).send('Something failed.');
    process.exit(1); //As winston is not exiting node process we have to do it manually here
};