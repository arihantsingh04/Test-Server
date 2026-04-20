const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        default: uuidv4,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'enter valid email '
        ]
    },
    password: {
        type: String,
        required: [true, 'enter valid pwd'],
        minlength: 3,
        select: false
    }
});

module.exports = mongoose.model('User', userSchema);
