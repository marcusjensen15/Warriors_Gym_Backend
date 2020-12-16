const Joi = require('joi');
const validateUser = require('./middleware/validateUser');
const express = require('express');
const questions = require('./routes/questions');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));

//All questions routes
app.use('/questions', questions);

//GET all users

app.get('/users', (req, res) => {

    res.send(usersArray);

});

//GET a specific user

app.get('/users/:id', (req, res) => {

    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('There is no user with that ID');
    res.send(user);

});

//POST a new user

app.post('/users', (req, res) => {

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

app.put('/users/:id', (req,res) => {

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

app.delete('/users/:id', (req,res) =>{

    const user = usersArray.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('A user with that ID was not found');

    const index = usersArray.indexOf(user);
    usersArray.splice(index, 1);

    res.send(user);

});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on port ' + port));