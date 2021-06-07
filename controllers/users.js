const User = require("../models/user");

module.exports.renderSigninForm = (req, res) => {
    res.render('users/register');
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = async (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success', 'Welcome back!');
    res.redirect(redirectUrl);
}

module.exports.signUpUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
// we are catching the error manually because we can't await isLoggedIn
        req.login(registeredUser, err => {
            if (err) return next(err);
//if the user was denied access to a url because he wasn't signed in we will redirect him after he 
//registers- session.returnTo is defined in the middleware
            const redirectUrl = req.session.returnTo || '/campgrounds';
            delete req.session.returnTo;
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect(redirectUrl);
        })
    }
    catch (err) {
        req.flash('error', err.message);
        return res.redirect('/register');
    }
}