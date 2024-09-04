const mongoose = require("mongoose")

const albumSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:String,
    photos:[{
        type : mongoose.Schema.Types.ObjectId, 
        ref:'Photo',
    }]
});

module.exports = albumSchema