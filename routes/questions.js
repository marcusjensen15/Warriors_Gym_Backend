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

router.get('/:category', async (req, res) => {

    const questionType = req.params.category;
    let results = await Question.find({category: questionType });

    if (results.length === 0){
        results = "There are no questions for this category"
    }
    res.send(results);
});

// GET all questions in the entire database 

router.get('/', async (req, res) => {
    // res.send(questionsArray);
    const questions = await Question.find();
    res.send(questions);
});

//POST a new question

router.post('/', async (req,res) => {

    const question = new Question({
        questionText: req.body.question,
        type: req.body.type,
        category: req.body.category,
        possibleAnswers: req.body.possibleAnswers,
        correctAnswer: req.body.correctAnswer
   });

    const validQuestion = validateQuestion(req.body);

    if (validQuestion.error){
        res.status(400).send(validQuestion.error.details[0].message);
        return;
    }

   const result = await question.save();
   res.send(question);


});

//GET a specific question

router.get('/:questiontype/:id', async (req,res) => {

    const questionId = req.params.id;

    try {
        let result = await Question.findById(questionId);
        if (!result){
            throw new Error();
        }
        res.send(result);
    }

    catch (error){
        res.send("There is no question with this ID");
    }
});


//PUT a specific question

router.put('/:questiontype/:id', async (req,res) => {

    const questionId = req.params.id;

    try {
        let question = await Question.findById(questionId);
        if (!question){
            throw new Error();
        }
        question.questionText = req.body.question;
        question.type = req.body.type;
        question.category = req.body.category;
        question.possibleAnswers = req.body.possibleAnswers;
        question.correctAnswer = req.body.correctAnswer;

        const validQuestion = validateQuestion(req.body);

        if (validQuestion.error){
            res.status(400).send(validQuestion.error.details[0].message);
            return;
        }

        const result = await question.save();


        res.send(result);
    }

    catch (error){
        res.send("There is no question with this ID");
    }




    // const question = questionsArray.find(q => q.id === parseInt(req.params.id));
    // if (!question) return res.status(404).send('The question with that ID was not found');

    // const result = validateQuestion(req.body);
    // if (result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    // question.question = req.body.question;
    // question.type = req.body.type;
    // question.category = req.body.category;
    // question.possibleAnswers = req.body.possibleAnswers;
    // question.correctAnswer = req.body.correctAnswer;

    // res.send(question);

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