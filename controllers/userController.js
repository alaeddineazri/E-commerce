// import user model
const User = require("../models/userModel");


exports.userById = (req, res, next, id) => {
    User.findById(id)


        .exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
            error: "User not found",
            });
            
        }
        //save user object in request object
        req.profile = user;
        next();
        });
    }