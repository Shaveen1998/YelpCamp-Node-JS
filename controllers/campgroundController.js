const Campground = require('../models/campground');

const getCampgrounds = (async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

const renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

const createNewCampground = async (req, res, next) => {
   
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.images =  req.files.map(f=>({url:f.path, filename:f.filename}))
    campground.author = req.user._id
    await campground.save();
    console.log(campground)
    // req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

const showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        },
    }).populate('author');
    if (!campground) {
        // req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    console.log(campground)
    res.render('campgrounds/show', { campground });
}

const renderEditCampground = async (req, res) => {
    const { id } = req.params;
    const campground=await Campground.findById(id);
    if (!campground) {
        // req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    
    res.render('campgrounds/edit', { campground });
}

const editCampground = async (req, res) => {
    
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f=>({url:f.path, filename:f.filename}))
    campground.images.push(...imgs) 
    await campground.save()
    // req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

const deleteCampground = async (req, res) => {
    const { id } = req.params;
    
    await Campground.findByIdAndDelete(id);
    // req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}

module.exports = {getCampgrounds, createNewCampground, showCampground, renderEditCampground, renderNewForm, editCampground,deleteCampground}