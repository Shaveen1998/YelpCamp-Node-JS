const express = require('express')
const router = express.Router({ mergeParams: true });

const {reviewSchema} = require('../schema')
const Review = require('../models/review')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.nody)
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next()
    }
}


router.post('/', validateReview, catchAsync(async(req,res)=>{
    const { id } = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review) 
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
   
}))

router.delete('/:reviewId',catchAsync(async(req,res)=>{
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router