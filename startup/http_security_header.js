/**
 * Set different properties of the request-header to max security settings. 
 * This module needs updated information
 * 
 * More can be read at:
 * https://www.npmjs.com/package/helmet
 */

const helmet = require("helmet");

module.exports = function (app) {
    app.use(helmet());
};