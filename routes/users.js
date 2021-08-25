const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../models/user');
const validateUser = require('../middleware/validateUser');
const authMiddleware = require('../middleware/auth');
const validateAdmin = require('../middleware/validateAdmin');

//GET all users:

router.get('/', [authMiddleware, validateAdmin], async (req, res) => {

    const users = await User.find();
    res.send(users);
});

// GET a specific user utilizing web token identification:

router.get('/me', authMiddleware, async (req,res) => {

    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

//POST a new user:

router.post('/', async (req, res) => {

    const validUser = validateUser(req.body);

    if (validUser.error){
        res.status(400).send(validUser.error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('This user is already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token',token).send( _.pick(user, ['_id', 'name', 'email']));
});

//PUT a specific user using token based auth: 

router.put('/me', authMiddleware, async (req,res) => {

    const user = await User.findById(req.body._id);

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

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newUser.password, salt);
    user.name = newUser.name;
    user.email = newUser.email;

    await user.save();

    res.send(_.pick(newUser, ['_id','name','email']));

});

//DELETE a specific user: (In future we may want to only have admins be able to delete accoutns)

router.delete('/:id', [authMiddleware, validateAdmin], async (req,res) =>{

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('A user with that ID was not found');
    const result = await User.deleteOne({ _id: req.params.id });
    res.send("This user was sucessfully deleted.");

});

module.exports = router;