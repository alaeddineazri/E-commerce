// controller/user.js
//require user model
const User = require('../models/user');


exports.signup = (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });
    user.save()
        .then(() => {
            res.status(201).json({
                message: 'User created successfully!'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
}