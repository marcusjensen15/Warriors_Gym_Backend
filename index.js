const Joi = require('joi');
const express = require('express');
const app = express();


// app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));

// allQuestions and usersArray is fake data (obviously)

const allQuestions = [{type: "bill", name: "steve", id: 4}, {type: "bill", name: "mike", id: 7}, {type:"fred", name:"oink", id:10},  {type:"fred", name:"howdy", id: 6}];

const usersArray = [{name: "Bill", email: "bill@test.com", password: "fastcar", id:1},{name: "Samantha", email: "samantha@test.com", password: "slowcar", id:2},{name: "Fred", email: "fred@test.com", password: "fastfred", id:3},{name: "Toni", email: "toni@test.com", password: "tonitime", id:4}];

// Question validation middleware, will be seperated into another file later
// When ID gets incorporated into this, we will write validation middleware for it below. For now, number is an int. In production it will likely be a string.

function validateQuestion(question){

    const questionSchema = Joi.object({
        question: Joi.string().min(10).required(),
        type: Joi.string().required(),
        category: Joi.string().required(),
        possibleAnswers: Joi.array().items(Joi.string()).required(),
        correctAnswer: Joi.string().required()
    });
    
    return questionSchema.validate(question);

};

// User Validation Middleware. Will need to incorporate addtional logic to check DB if user exists 

function validateUser(user){

    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required()
    });
    
    return userSchema.validate(user);

};


// GET all questions of a given type

app.get('/allquestions/:questiontype', (req, res) => {

    const questionType = req.params.questiontype;

    let results = allQuestions.filter(question => {
        if (question.type === questionType){
            return question;
        }
    });

    if (results.length === 0){

        results = "There are no questions for this category"
    }

    res.send(results);

});

// GET all questions in the entire database 

app.get('/allquestions', (req, res) => {

    res.send(allQuestions);

});

//POST a new question

app.post('/allquestions', (req,res) => {

    const question = {
        id: allQuestions.length + 1,
        question: req.body.question,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer
    };

    const result = validateQuestion(req.body);

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    allQuestions.push(question);
     res.send(question);


});

//GET a specific question

app.get('/allquestions/:questiontype/:id', (req,res) => {

    const questionType = req.params.questiontype;
    const questionId = req.params.id;

    let result = allQuestions.filter(question => {
        if (question.type === questionType && question.id == questionId){
            return question;
        }
    });

    if (result.length === 0){

        result = "There is no question with this ID"
    }

    res.send(result);
});


//PUT a specific question

app.put('/allquestions/:questiontype/:id', (req,res) => {

const question = allQuestions.find(q => q.id === parseInt(req.params.id));

if (!question) return res.status(404).send('The question with that ID was not found');

    const result = validateQuestion(req.body);

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

question.question = req.body.question;
question.type = req.body.type;
question.category = req.body.category;
question.possibleAnswers = req.body.possibleAnswers;
question.correctAnswer = req.body.correctAnswer;

res.send(question);

}); 

//DELETE a specific question

app.delete('/allquestions/:questiontype/:id', (req,res) => {

    const question = allQuestions.find(q => q.id === parseInt(req.params.id));
    if (!question) return res.status(404).send('The question with that ID was not found');

    const index = allQuestions.indexOf(question);
    allQuestions.splice(index, 1);

    res.send(question);
    
});


//GET all users

app.get('/users', (req, res) => {

    res.send(usersArray);

});

//GET a specific user

app.get('/users/:id', (req, res) => {

    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('There is no user with that ID');
    res.send(user);

});

//POST a new user

app.post('/users', (req, res) => {

    const user = {
        id: usersArray.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const result = validateUser(req.body);

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    usersArray.push(user);
    res.send(user);

});

//PUT a specific user 

app.put('/users/:id', (req,res) => {

    const user = usersArray.find(q => q.id === parseInt(req.params.id));

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const result = validateUser(newUser);

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    user.name = newUser.name;
    user.email = newUser.email;
    user.password = newUser.password;

    res.send(newUser);

});

//DELETE a specific user

app.delete('/users/:id', (req,res) =>{

    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('A user with that ID was not found');

    const index = usersArray.indexOf(user);
    usersArray.splice(index, 1);

    res.send(user);

});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on port ' + port));