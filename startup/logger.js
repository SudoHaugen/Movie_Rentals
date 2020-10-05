const { createLogger, transports, format } = require("winston");
const winston = require("winston/lib/winston/config");
require('winston-mongodb');
require('express-async-errors');

//Currently Winston console output does not work as expected. prettyPrint and colorize does not work per documentation. Before this is fixed we have to use the default log output in console for uncaught exception errors


/* Custom format for log levels and color codes for winston console output
const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        sql: 4,
        debug: 5
    },
    colors: {
        error: "red",
        warn: "darkred",
        info: "black",
        http: "green",
        sql: "blue",
        debug: "gray"
    }
};
*/

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: 'emergency.log', level: 'emerg', timestamp: true }),
        new transports.File({ filename: 'alert.log', level: 'alert', timestamp: true }),
        new transports.File({ filename: 'critical.log', level: 'crit', timestamp: true }),
        new transports.File({ filename: 'error.log', level: 'error', timestamp: true }),
        new transports.File({ filename: 'combined.log', timestamp: true }), //All logfiles with level info and below will be saved in combined.log
        new transports.MongoDB({ db: 'mongodb://localhost/Vidly', timestamp: true, options: { useUnifiedTopology: true }, collection: 'logs' }) //Save all logs in MongoDB (change path to your own DB location)
    ],
    exceptionHandlers: [
        new transports.Console(),
        new transports.File({ filename: 'uncaughtExceptions.log', timestamp: true }),
        new transports.MongoDB({ db: 'mongodb://localhost/Vidly', timestamp: true, options: { useUnifiedTopology: true }, collection: 'uncaughtExceptions.log' })
    ]
});

module.exports.logger = logger;