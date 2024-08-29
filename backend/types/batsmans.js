const mongoose= require('mongoose');
const is= new mongoose.Schema(
    {
        id: Number,
        name: String,
        rating:Number
    }
)
const im= mongoose.model("item",is);
module.exports = im;