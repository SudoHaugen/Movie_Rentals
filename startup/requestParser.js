//Parses the request object and populate req.body object

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function (app) {
    app.use(jsonParser);
    app.use(urlencodedParser);
};