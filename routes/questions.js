const express = require('express');
const router = express.Router();
const validateQuestion = require('../middleware/validateQuestion');


// Questions and usersArray is fake data (obviously)

const questions = [{type: "bill", name: "steve", id: 4}, {type: "bill", name: "mike", id: 7}, {type:"fred", name:"lalala", id:10},  {type:"fred", name:"howdy", id: 6}];
const usersArray = [{name: "Bill", email: "bill@test.com", password: "fastcar", id:1},{name: "Samantha", email: "samantha@test.com", password: "slowcar", id:2},{name: "Fred", email: "fred@test.com", password: "fastfred", id:3},{name: "Toni", email: "toni@test.com", password: "tonitime", id:4}];

// GET questions of a given type

router.get('/:questiontype', (req, res) => {

    const questionType = req.params.questiontype;

    let results = questions.filter(question => {
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

router.get('/', (req, res) => {

    res.send(questions);

});

//POST a new question

router.post('/', (req,res) => {

    const question = {
        id: questions.length + 1,
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

    questions.push(question);
     res.send(question);

});

//GET a specific question

router.get('/:questiontype/:id', (req,res) => {

    const questionType = req.params.questiontype;
    const questionId = req.params.id;

    let result = questions.filter(question => {
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

router.put('/:questiontype/:id', (req,res) => {

const question = questions.find(q => q.id === parseInt(req.params.id));

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

router.delete('/:questiontype/:id', (req,res) => {

    const question = questions.find(q => q.id === parseInt(req.params.id));
    if (!question) return res.status(404).send('The question with that ID was not found');

    const index = questions.indexOf(question);
    questions.splice(index, 1);

    res.send(question);
    
});

module.exports = router;