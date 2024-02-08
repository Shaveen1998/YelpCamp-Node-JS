const mongoose=require('mongoose');
const {Schema}=mongoose;

const reviewSchema=new Schema({
    body:String,
    rating:Number,
    author:{
        type:Schema.Types.ObjectId,  //this is how we connect two odels together
        ref:'User'
    },
})

module.exports=mongoose.model('Review',reviewSchema);