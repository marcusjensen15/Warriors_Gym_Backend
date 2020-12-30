const express = require('express');
const router = express.Router();
const validateQuestion = require('../middleware/validateQuestion');
const mongoose = require('mongoose');
const {Question} = require('../schema/questionSchema');
const authMiddleware = require('../middleware/auth');
const manager = require('../middleware/manager');

// GET questions of a given type:

router.get('/:category', authMiddleware, async (req, res) => {

    const questionType = req.params.category;
    let results = await Question.find({category: questionType });

    if (results.length === 0){
        results = "There are no questions for this category"
    }
    res.send(results);
});

// GET all questions in the entire database: 

router.get('/', authMiddleware, async (req, res) => {
    
    throw new Error('unable to get questions');

    const questions = await Question.find();
    res.send(questions);
});

//POST a new question:

router.post('/', [authMiddleware, manager], async (req,res) => {

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

//GET a specific question:

router.get('/:category/:id', authMiddleware, async (req,res) => {

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


//PUT a specific question:

router.put('/:category/:id', [authMiddleware, manager], async (req,res) => {

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

}); 

//DELETE a specific question:

router.delete('/:category/:id', [authMiddleware, manager], async (req,res) => {

    const result = await Question.deleteOne({ _id: req.params.id });
    res.send("This question was successfully deleted.")
  
});

module.exports = router;