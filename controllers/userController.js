// import models
const User = require('../models/userModel');
const {errorHandler} = require('../helpers/dbErrHandler');
const { use } = require('../routes/userRoutes');


exports.Signup=(req,res)=>{
    console.log("req.body",req.body);
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                
                err:errorHandler(err)
            });
            
        }
        //easy way to hide salt and hashed_password in response
        user.salt=undefined
        user.hashed_password=undefined
        
        res.json({
            user
        });
    });
}