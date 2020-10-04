const { logger } = require('../config/logger');

module.exports = function (err, req, res, next) {
    logger.info(err.message, { metadata: err.stack });
    res.status(500).send('Something failed.');
}