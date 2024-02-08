const User = require('../models/userModel');

const renderUserRegister = (req, res) => {
    res.render('users/register')
}

const registerUser = async(req,res)=>{

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
 }

 const renderUserLogin = (req, res) => {
    res.render('users/login')
}

const loginUser = (req, res) => {
    
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // 
    res.redirect(redirectUrl)
}

const logoutUser = (req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect('/campgrounds')
    });
   
}

module.exports = {registerUser, renderUserLogin, renderUserRegister, loginUser, logoutUser}