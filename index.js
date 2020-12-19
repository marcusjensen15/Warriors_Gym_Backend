const Joi = require('joi');
const express = require('express');
const questions = require('./routes/questions');
const users = require('./routes/users');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Will need to include a couple different enviornments:

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

//All questions routes
app.use('/questions', questions);

//All users routes
app.use('/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));