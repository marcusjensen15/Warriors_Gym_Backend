const bodyParser = require('body-parser');
const winston = require('winston');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

// Will need to include a couple different enviornments

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info('listening on port ' + port));
module.exports = server;