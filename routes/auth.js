const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../schema/userSchema');
const validateLogin = require('../middleware/validateLogin');
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

    // 'Secret' string below will later be in an ENV variable. Hardcoding it here just for demo.
    const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey');

    res.send(token);
});

module.exports = router;