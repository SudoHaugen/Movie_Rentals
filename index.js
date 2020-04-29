const express = require('express');
const app = new express();
const port = process.env.PORT || 8080;
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled for active logging...');
}

// Db work
dbDebugger('Connected to the database...'); 

app.use(helmet());
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/', require('./routes/home'));
app.use('/api/genres', require('./routes/genres'));
app.use(express.static('public'));

app.listen(port);