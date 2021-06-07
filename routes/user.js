const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const User = require("../models/user");
const passport = require("passport");
const { renderLoginForm, loginUser, renderSigninForm, signUpUser } = require("../controllers/users");

router.route('/register')
    .get(renderSigninForm)
    .post(signUpUser)

router.route('/login')
    .get(renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        loginUser)

router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect('/campgrounds');
})

module.exports = router;