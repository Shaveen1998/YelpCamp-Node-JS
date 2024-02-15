const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://shaveenleousj:pLfo7hKZycWUMIai@cluster0.ggsknbj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'65ba25fd15421549cf74e49b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ipsum incidunt, repellendus corporis corrupti harum eum cum recusandae, eveniet distinctio a, saepe voluptatibus! Repudiandae, eos! Ea aliquid iure nihil id?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/deamu84zm/image/upload/v1707928947/YelpCamp/ibaqhgwgwbz128nht7vr.jpg',
                    filename: 'YelpCamp/ibaqhgwgwbz128nht7vr',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})