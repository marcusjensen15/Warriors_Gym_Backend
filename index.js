const express = require('express');
const app = express();

app.get('/allquestions', (req, res) => {

    res.send('hello world all questions');

});

app.get('/assesmentsquestions', (req, res) => {

    res.send('hello world assesments questions');

});

app.get('/trainingquestions', (req, res) => {

    res.send('hello world training questions');

});

app.get('/tournamentquestions', (req, res) => {

    res.send('hello world tournament questions');

});

app.get('/coursesquestions', (req, res) => {

    res.send('hello world courses questions');

});

app.get('/senseiquestions', (req, res) => {

    res.send('hello world sensei questions');

});

app.get('/configurationquestions', (req, res) => {

    res.send('hello world configuration questions');

});

app.get('/metricsreportsquestions', (req, res) => {

    res.send('hello world metricsreports questions');

});

app.get('/users', (req, res) => {

    res.send('hello world users');

});

app.listen(3000, () => console.log('listening on port 3000'));