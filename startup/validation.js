//Checks for invalid or malicious API calls to endpoints

const Joi = require("joi");

module.exports = function () {
    Joi.objectId = require("joi-objectid")(Joi);
};