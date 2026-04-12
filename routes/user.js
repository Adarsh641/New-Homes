const express= require('express');
const router = express.Router();
const User= require('../models/user.js');
const wrapAsync= require('../utils/wrapAsync');
const passport= require('passport');
const {saveRedirectUrl}= require('../middleware.js');
const usercontroller = require('../controllers/users.js');
const user = require('../models/user.js');
router.get('/signup', usercontroller.renderSignupForm);
router.post('/signup', wrapAsync(usercontroller.signup));

router.get('/login', usercontroller.renderLoginForm);

router.post('/login', saveRedirectUrl, passport.authenticate('local',
     {failureFlash: true, failureRedirect: '/login'}), 
     usercontroller.login);
 
router.get('/logout', usercontroller.logout);

module.exports= router;