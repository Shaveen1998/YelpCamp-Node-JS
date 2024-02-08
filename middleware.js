const ExpressError = require('./utils/ExpressError.js');
const { campgroundSchema, reviewSchema } = require('./schema.js');
const Campground = require('./models/campground.js')


const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // add this line
        return res.redirect('/login')
    }
    next()
}

const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const isAuthor = async (req,res,next)=>{
    const {id} =req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)) {
        return res.redirect(`/campgrounds/${id}`)
    }

    next()
}

const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.nody)
    if(error){
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next()
    }
}


module.exports = {isLoggedIn, storeReturnTo, isAuthor, validateCampground, validateReview}
