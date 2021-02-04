const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {

    const logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          winston.format.prettyPrint()
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({filename: "logfile.log"}),
          new winston.transports.MongoDB({ db: 'mongodb://localhost/warriors_gym', collection: 'errorlogs' })
    
        ]
    });
    
    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}));
    
    process.on('unhandledRejection', (ex) => {
      throw ex;
    });
     
    winston.add(logger)
};