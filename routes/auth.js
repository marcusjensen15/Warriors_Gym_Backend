const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../models/user');
const validateLogin = require('../middleware/validateLogin');
const authMiddleware = require('../middleware/auth');

//POST: Existing User Login

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

    const token = user.generateAuthToken();

    res.send({token});
});

//Validate that the user provided token is real

router.post('/usertokenverification',authMiddleware, async (req, res) => {
    res.send(true);
});








module.exports = router;