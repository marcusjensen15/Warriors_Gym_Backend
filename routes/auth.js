const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../schema/userSchema');
// const validateUser = require('../middleware/validateUser');
const mongoose = require('mongoose');
const Joi = require('joi');


//POST a new user

router.post('/', async (req, res) => {

    const validUser = validateLogin(req.body);

    if (validUser.error){
        res.status(400).send(validUser.error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword){
        return res.status(400).send('Invalid email or password');
    }

    res.send(true);
});

//Will seperate function below in to seperate loginValidation middleware

function validateLogin(req){


    const userSchema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return userSchema.validate(req);



};

module.exports = router;