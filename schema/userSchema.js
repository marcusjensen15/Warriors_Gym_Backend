const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        possibleAnswers: [ String ],
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    isManager: Boolean
}
);

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isManager: this.isManager}, config.get('jwtPrivateKey'));
    return token
}

const User = mongoose.model('User', userSchema);




exports.User = User;
