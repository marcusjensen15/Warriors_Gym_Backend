const express = require('express');
const app = express();


// app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));


const assessmentsQuestions = ['assessmentsQuestionstest'];

const trainingQuestions = ['trainingQuestionstest'];

const tournamentQuestions = ['tournamentQuestionstest'];

const coursesQuestions = ['coursesQuestionstest'];

const senseiQuestions = ['senseiquestions test'];

const configurationQuestions = ['configquestionstest'];

const metricsReportsQuestions = ['metricsreportsquestionstest'];

const usersArray = ['userstesxt'];



//All questions request


app.get('/allquestions', (req, res) => {

    res.send('hello world all questions');

});

//Assessments questions requests

app.get('/assesmentsquestions', (req, res) => {

    res.send(assessmentsQuestions);

});

app.get('/assesmentsquestions/:id', (req, res) => {

    res.send(`hello world assesments question ${req.params.id}`);

});

app.post('/assesmentsquestions', (req, res) => {

     const assessmentQuestion = {
        id: assessmentsQuestions.length + 1,
        question: req.body.question,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer
    };

    assessmentsQuestions.push(assessmentQuestion);
     res.send(assessmentQuestion);

  });

//Training questions requests

app.get('/trainingquestions', (req, res) => {

    res.send(trainingQuestions);

});

app.get('/trainingquestions/:id', (req, res) => {

    res.send(`hello world training questions ${req.params.id}`);

});

app.post('/trainingquestions', (req, res) => {

    const trainingQuestion = {
        id: trainingQuestions.length + 1,
        question: req.body.question,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer
    };

    trainingQuestions.push(trainingQuestion);
    res.send(trainingQuestion);

});



//Tournament questions requests

app.get('/tournamentquestions', (req, res) => {

    res.send(tournamentQuestions);

});

app.get('/tournamentquestions/:id', (req, res) => {

    res.send(`hello world tournament questions ${req.params.id}`);

});

app.post('/tournamentquestions', (req, res) => {

    const tournamentQuestion = {
        id: tournamentQuestions.length + 1,
        question: req.body.question,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer
    };

    tournamentQuestions.push(tournamentQuestion);
    res.send(tournamentQuestion);

});




//Courses questions requests

app.get('/coursesquestions', (req, res) => {

    res.send(coursesQuestions);

});

app.get('/coursesquestions/:id', (req, res) => {

    res.send(`hello world courses questions ${req.params.id}`);

});

app.post('/coursesquestions', (req, res) => {

    const coursesQuestion = {
        id: coursesQuestions.length + 1,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer

    };

    coursesQuestions.push(coursesQuestion);
    res.send(coursesQuestion);

});


//Sensei questions requests

app.get('/senseiquestions', (req, res) => {

    res.send(senseiQuestions);

});

app.get('/senseiquestions/:id', (req, res) => {

    res.send(`hello world sensei questions ${req.params.id}`);

});

app.post('/senseiquestions', (req, res) => {

    const senseiQuestion = {
        id: senseiQuestions.length + 1,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer


    };

    senseiQuestions.push(senseiQuestion);
    res.send(senseiQuestion);

});


//Configuration questions requests

app.get('/configurationquestions', (req, res) => {

    res.send('hello world configuration questions');

});

app.get('/configurationquestions/:id', (req, res) => {

    res.send(`hello world configuration questions ${req.params.id}`);

});

app.post('/configurationquestions', (req, res) => {

    const configurationQuestion = {
        id: configurationQuestions.length + 1,
        name: req.body.name
    };

    aconfigurationQuestions.push(configurationQuestion);
    res.send(configurationQuestion);

});



//Metrics Reports questions requests

app.get('/metricsreportsquestions', (req, res) => {

    res.send('hello world metricsreports questions');

});

app.get('/metricsreportsquestions/:id', (req, res) => {

    res.send(`hello world metricsreports questions ${req.params.id}`);

});

app.post('/metricsreportsquestions', (req, res) => {

    const metricsreportsQuestion = {
        id: metricsreportsQuestions.length + 1,
        name: req.body.name
    };

    metricsreportsQuestions.push(metricsreportsQuestion);
    res.send(metricsreportsQuestion);

});




//Users requests

app.get('/users', (req, res) => {

    res.send('hello world users');

});

app.get('/users/:id', (req, res) => {

    res.send(`hello world users ${req.params.id}`);

});

app.post('users', (req, res) => {

    const user = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(user);
    res.send(user);

});



const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on port ' + port));