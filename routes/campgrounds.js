const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware.js')
const multer  = require('multer');   //https://github.com/expressjs/multer
const {storage}=require('../cloudinary');
const upload = multer({ storage }); //Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

const {getCampgrounds, renderNewForm, renderEditCampground, createNewCampground, deleteCampground, editCampground, showCampground} = require('../controllers/campgroundController.js')



router.get('/', catchAsync(getCampgrounds));

router.get('/new', isLoggedIn,  renderNewForm)


router.post('/', isLoggedIn,upload.array('image'),validateCampground, catchAsync(createNewCampground))
// router.post('/', upload.array('image'), (req,res)=>{
//     res.send(req.files)
// })

router.get('/:id', isLoggedIn, catchAsync(showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditCampground))

//edit campground
router.put('/:id',isLoggedIn,isAuthor, upload.array('image'), validateCampground, catchAsync(editCampground));

//delete campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(deleteCampground));

module.exports = router;