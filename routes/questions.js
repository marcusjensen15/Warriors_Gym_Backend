const express = require('express');
const router = express.Router();
const validateQuestion = require('../middleware/validateQuestion');


// questions is fake data

const questionsArray = [{type: "bill", name: "steve", id: 4}, {type: "bill", name: "mike", id: 7}, {type:"fred", name:"lalala", id:10},  {type:"fred", name:"howdy", id: 6}];

// GET questions of a given type

router.get('/:questiontype', (req, res) => {

    const questionType = req.params.questiontype;
    let results = questionsArray.filter(question => {
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
    res.send(questionsArray);
});

//POST a new question

router.post('/', (req,res) => {
    const question = {
        id: questionsArray.length + 1,
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
    questionsArray.push(question);
     res.send(question);
});

//GET a specific question

router.get('/:questiontype/:id', (req,res) => {

    const questionType = req.params.questiontype;
    const questionId = req.params.id;
    let result = questionsArray.filter(question => {
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

    const question = questionsArray.find(q => q.id === parseInt(req.params.id));
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

    const question = questionsArray.find(q => q.id === parseInt(req.params.id));
    if (!question) return res.status(404).send('The question with that ID was not found');
    const index = questionsArray.indexOf(question);
    questionsArray.splice(index, 1);
    res.send(question);
    
});

module.exports = router;