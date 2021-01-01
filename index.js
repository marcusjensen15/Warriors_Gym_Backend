const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Will need to include a couple different enviornments

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info('listening on port ' + port));