const express = require('express');
const validateUser = require('../middleware/validateUser');
const router = express.Router();
const validateQuestion = require('../middleware/validateUser');

//usersArray is fake data

const usersArray = [{name: "Bill", email: "bill@test.com", password: "fastcar", id:1},{name: "Samantha", email: "samantha@test.com", password: "slowcar", id:2},{name: "Fred", email: "fred@test.com", password: "fastfred", id:3},{name: "Toni", email: "toni@test.com", password: "tonitime", id:4}];


//GET all users

router.get('/', (req, res) => {

    res.send(usersArray);

});

//GET a specific user

router.get('/:id', (req, res) => {

    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('There is no user with that ID');
    res.send(user);

});

//POST a new user

router.post('/', (req, res) => {

    const user = {
        id: usersArray.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const result = validateUser(req.body);

    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    usersArray.push(user);
    res.send(user);

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