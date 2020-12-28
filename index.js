require('express-async-errors');
const error = require('./middleware/error');
const Joi = require('joi');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const questions = require('./routes/questions');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');
app.use(bodyParser.urlencoded({
    extended: true
  }));

  if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined. You must set the ENV Variable');
    process.exit(1);
  }
mongoose.connect('mongodb://localhost:27017/warriors_gym')
    .then(() => console.log('Connected to mongodb db'))
    .catch(err => console.error('Could not connect to MongoDB', err));
    
// Will need to include a couple different enviornments

//All questions routes:

app.use('/questions', authMiddleware, questions);

//All users routes:

app.use('/users', users);

//All auth routes:

app.use('/auth', auth);

//Catching server errors:

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));