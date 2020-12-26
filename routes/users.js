const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../schema/userSchema');
const validateUser = require('../middleware/validateUser');
const mongoose = require('mongoose');



//GET all users

router.get('/', async (req, res) => {

    const users = await User.find();
    res.send(users);
});

//GET a specific user

router.get('/:id', (req, res) => {
    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('There is no user with that ID');
    res.send(user);
});

//POST a new user

router.post('/', async (req, res) => {

    const validUser = validateUser(req.body);

    if (validUser.error){
        res.status(400).send(validUser.error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);


    await user.save();

    // const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));

    const token = user.generateAuthToken();


    res.header('x-auth-token',token).send( _.pick(user, ['_id', 'name', 'email']));
});

//PUT a specific user 

router.put('/:id', (req,res) => {
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

router.delete('/:id', (req,res) =>{

    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('A user with that ID was not found');
    const index = usersArray.indexOf(user);
    usersArray.splice(index, 1);
    res.send(user);

});

module.exports = router;