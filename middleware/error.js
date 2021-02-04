const winston = require('winston');

module.exports = function(err, req, res, next){
    
    // Need to log the exceptions here
    winston.error(err.message, err);
    
    res.status(500).send('Something has failed.');
};