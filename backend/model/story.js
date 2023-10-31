const mongoose= require('mongoose');



const storySchema = new mongoose.Schema({

caption:String,
image:{
    public_Id:String,
    url:String
},

owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},

createdAt:{
    type:Date,
    default:Date.now
},

views:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
],


})


module.exports = mongoose.model('Story', storySchema);