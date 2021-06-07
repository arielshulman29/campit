const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../Schemas');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');
const { createNewReview, deleteReview } = require('../controllers/reviews');

const Campground = require("../models/campground");
const Review = require("../models/review");


//post review
router.post('/', isLoggedIn, validateReview, catchAsync(createNewReview))

//delete review
router.delete('/:reviewId', isLoggedIn ,isReviewAuthor, catchAsync(deleteReview))

module.exports = router;