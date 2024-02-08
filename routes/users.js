const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const {registerUser, renderUserLogin, renderUserRegister, loginUser, logoutUser} =  require('../controllers/userController')

router.get('/register', renderUserRegister);

router.post('/register',catchAsync(registerUser))


router.get('/login', renderUserLogin);

router.post('/login',  storeReturnTo, passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}),loginUser);

router.get('/logout', logoutUser)


module.exports = router;