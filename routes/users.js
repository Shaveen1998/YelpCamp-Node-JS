const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');


router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register',catchAsync( async(req,res)=>{

   try{
    const {email, username, password} = req.body
    const user = new User({
        email,
        username
    })
    const registeredUser = await  User.register(user, password)
    res.redirect('/login')
   }catch(e){
    res.redirect('/register')
   }
}))


router.get('/login', (req, res) => {
    res.render('users/login')
});

router.post('/login',  storeReturnTo, passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}),(req, res) => {
    
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // 
    res.redirect(redirectUrl)
});

router.get('/logout', (req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect('/campgrounds')
    });
   
})


module.exports = router;