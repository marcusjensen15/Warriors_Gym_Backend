const express = require('express');
const app = express();


//All questions request


app.get('/allquestions', (req, res) => {

    res.send('hello world all questions');

});

//Assessments questions requests

app.get('/assesmentsquestions', (req, res) => {

    res.send('hello world assesments questions');

});

app.get('/assesmentsquestions/:id', (req, res) => {

    res.send(`hello world assesments question ${req.params.id}`);

});



//Training questions requests

app.get('/trainingquestions', (req, res) => {

    res.send('hello world training questions');

});

//Tournament questions requests

app.get('/tournamentquestions', (req, res) => {

    res.send('hello world tournament questions');

});

//Courses questions requests

app.get('/coursesquestions', (req, res) => {

    res.send('hello world courses questions');

});

//Sensei questions requests

app.get('/senseiquestions', (req, res) => {

    res.send('hello world sensei questions');

});

//Configuration questions requests

app.get('/configurationquestions', (req, res) => {

    res.send('hello world configuration questions');

});

//Metrics Reports questions requests

app.get('/metricsreportsquestions', (req, res) => {

    res.send('hello world metricsreports questions');

});

//Users requests

app.get('/users', (req, res) => {

    res.send('hello world users');

});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on port ' + port));