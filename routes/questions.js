const express = require('express');
const router = express.Router();
const validateQuestion = require('../middleware/validateQuestion');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/warriors_gym')
    .then(() => console.log('Connected to mongodb questions db'))
    .catch(err => console.error('Could not connect to MongoDB questions', err));

// seperate question schema and question into another file.

const questionSchema = new mongoose.Schema({
    questionText: String,
    type: String,
    category: String,
    possibleAnswers: [ String ],
    correctAnswer: String,
    date: { type: Date, default: Date.now}
});

const Question = mongoose.model('Question', questionSchema);

// Will implement below in POST route:
//     const question = new Question({
//         questionText: req.body.question,
//         type: req.body.type,
//         category: req.body.category,
//         possibleAnswers: req.body.possibleAnswers,
//         correctAnswer: req.body.correctAnswer
//    });






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

router.post('/', async (req,res) => {

    //need to validate before adding to DB:
    
    // const question = {
    //     id: questionsArray.length + 1,
    //     question: req.body.question,
    //     type: req.body.type,
    //     category: req.body.category,
    //     possibleAnswers: req.body.possibleAnswers,
    //     correctAnswer: req.body.correctAnswer
    // };

    // const result = validateQuestion(req.body);
    // if (result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    // questionsArray.push(question);
    //  res.send(question);

    const question = new Question({
        questionText: req.body.question,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer
   });

   const result = await question.save();
   res.send(result);


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