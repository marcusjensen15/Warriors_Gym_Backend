const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017/warriors_gym')
    .then(() => winston.info('Connected to mongodb db'));

};