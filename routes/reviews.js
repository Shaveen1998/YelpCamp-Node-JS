const express = require('express')
const router = express.Router({ mergeParams: true });
const Review = require('../models/review')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const {validateReview, isLoggedIn} = require('../middleware.js')
const {deleteReview, postReview} = require('../controllers/reviewController.js')

router.post('/', validateReview, isLoggedIn, catchAsync(postReview))

router.delete('/:reviewId', isLoggedIn,catchAsync(deleteReview))

module.exports = router