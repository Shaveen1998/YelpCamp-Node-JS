const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const session = require('express-session')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const flash = require('connect-flash')
const passport  = require('passport')
const LocalStrategy  = require('passport-local')
const User = require('./models/userModel')
const userRoutes = require('./routes/users')


//mongoose
mongoose.connect('mongodb+srv://shaveenleousj:pLfo7hKZycWUMIai@cluster0.ggsknbj.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open",()=>{
    console.log("Database Connected")
})


//middleware
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
const sessionConfig = {
    secret:'thisshouldbethesecret!',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}

app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// app.use(flash())

// app.use((req,res,next)=>{
//     res.locals.success = req.flash('success');
//     res.locals.error= req.flash('error')
//     next()
// })

app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

app.get('/',(req,res)=>{
    res.render("home")
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

//error handler middleware
app.use((err,req,res,next)=>{
    const {statusCode=500,message='Something went wrong'}=err;
    res.status(statusCode).render('error',{err});

})

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})