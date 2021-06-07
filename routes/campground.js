const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateCampground, isLoggedIn, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


//show all campgrounds

router.route('/')
    .get(catchAsync(campgrounds.allcamps))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCamp))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showOneCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.renderEditForm))


module.exports = router;



