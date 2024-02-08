const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware.js')

const {getCampgrounds, renderNewForm, renderEditCampground, createNewCampground, deleteCampground, editCampground, showCampground} = require('../controllers/campgroundController.js')



router.get('/', catchAsync(getCampgrounds));

router.get('/new', isLoggedIn, renderNewForm)


router.post('/', validateCampground, isLoggedIn, catchAsync(createNewCampground))

router.get('/:id', isLoggedIn, catchAsync(showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditCampground))

//edit campground
router.put('/:id', validateCampground,isLoggedIn, isAuthor, catchAsync(editCampground));

//delete campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(deleteCampground));

module.exports = router;