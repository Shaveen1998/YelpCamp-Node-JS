const Review = require('../models/review')
const Campground = require('../models/campground')

const postReview = async(req,res)=>{
    const { id } = req.params
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review) 
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
   
}

const deleteReview = async(req,res)=>{
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/${id}`)
}

module.exports = {deleteReview, postReview}