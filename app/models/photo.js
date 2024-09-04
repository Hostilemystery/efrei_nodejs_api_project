const mongoose = require("mongoose")

const PhotoSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    url:{
        type: String,
        required:true
    },
    description:String,
    album:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Album',
        required:true
    }
});

module.exports = PhotoSchema