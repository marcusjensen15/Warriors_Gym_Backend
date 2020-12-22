const express = require('express');
// const validateUser = require('../middleware/validateUser');
const router = express.Router();
const {User, validateUser} = require('../schema/userSchema');
// const validateQuestion = require('../middleware/validateUser');
const mongoose = require('mongoose');
// const { validate } = require('../model/question');
// mongoose.connect('mongodb://localhost:27017/warriors_gym')
//     .then(() => console.log('Connected to mongodb users db'))
//     .catch(err => console.error('Could not connect to MongoDB users', err));

//usersArray is fake data

const usersArray = [{name: "Bill", email: "bill@test.com", password: "fastcar", id:1},{name: "Samantha", email: "samantha@test.com", password: "slowcar", id:2},{name: "Fred", email: "fred@test.com", password: "fastfred", id:3},{name: "Toni", email: "toni@test.com", password: "tonitime", id:4}];


//GET all users

router.get('/', async (req, res) => {

    const users = await User.find();
    res.send(users);
    // res.send(usersArray);
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

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();

    res.send(user);

    // const user = {
    //     id: usersArray.length + 1,
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // };
    // const result = validateUser(req.body);
    // if (result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    // usersArray.push(user);
    // res.send(user);
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