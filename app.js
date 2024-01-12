const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

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

app.get('/',(req,res)=>{
    res.render("home")
})

app.get('/campgrounds',async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render("campgrounds/index", {campgrounds})
})

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})