// import models
const User = require('../models/userModel')
//import jsonwebtoken to generate token
const jwt=require('jsonwebtoken')
// import expressJwt to verify token authorization
const expressJwt = require('express-jwt')



const {errorHandler} = require('../helpers/dbErrHandler');



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

//login controller
exports.Login=(req,res)=>{ 
    //find the user based on email
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User with that email does not exist. Please signup"
            });
        }
        //if user is found make sure the email and password match
        //create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Wrong password"
            });
        }
        //generate a token with user id and secret
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire:new Date()+7200})    //2 hours
        //return response with user and token to frontend client
        const {_id,name,email,role}=user
        return res.json({token,user:{_id,name,email,role}});
    });

}