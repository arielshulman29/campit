const { campgroundSchema, reviewSchema } = require('./Schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

//is the user logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //in order to redirect the user to the address that he didn't have authorization for after he signs in
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must be logged in');
        return res.redirect('/login');
    }
    next();
}

//is the user the author
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'you are not authorised to edit this campground');
        return res.redirect(`/campgrounds/${campground._id}`);
    }
    next();
}

//are the data we got for the campground valid
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next()
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'you are not authorised to delete this review');
        return res.redirect(`/campgrounds/${campground._id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next()
    }
}
