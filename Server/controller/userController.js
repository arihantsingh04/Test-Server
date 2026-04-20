const User = require('../model/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'enter email and pwd' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'user exists already ' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            email,
            password: hashedPassword
        });
        if (user) {
            res.status(201).json({
                uid: user.uid,
                email: user.email,
                message: 'user signed up'
            });
        } else {
            res.status(400).json({ message: 'invalid data' });
        }
    } catch (error) {
        console.error('signup error:', error);
        res.status(500).json({ message: 'server error' });
    }
    
};

module.exports = { registerUser };
