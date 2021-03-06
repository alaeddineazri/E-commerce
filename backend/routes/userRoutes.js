const express = require('express');
const router= express.Router();


const {userById  } = require('../controllers/userController');
const {isAuth , isAdmin } = require('../controllers/authController')
const { tokenMiddleware } = require('../middleware/tokenMiddleware');

router.get("/secret/:userId" , tokenMiddleware ,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    })
    console.log(res.profile)
})

router.param('userId',userById)

module.exports = router;