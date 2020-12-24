const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const questions = require('./routes/questions');
const users = require('./routes/users');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
mongoose.connect('mongodb://localhost:27017/warriors_gym')
    .then(() => console.log('Connected to mongodb db'))
    .catch(err => console.error('Could not connect to MongoDB', err));
// Will need to include a couple different enviornments:

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

//All questions routes
app.use('/questions', questions);

//All users routes
app.use('/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));