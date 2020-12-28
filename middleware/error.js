module.exports = function(err, req, res, next){
    // Need to log the exceptions here
    res.status(500).send('Something has failed.');
};