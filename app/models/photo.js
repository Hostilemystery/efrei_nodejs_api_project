// const mongoose = require("mongoose")

// const PhotoSchema = new mongoose.Schema({
//     title:{
//         type: String,
//         required:true
//     },
//     url:{
//         type: String,
//         required:true
//     },
//     description:String,
//     album:{
//         type : mongoose.Schema.Types.ObjectId,
//         ref:'Album',
//         required:true
//     }
// });

// module.exports = PhotoSchema


const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Photo title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
        trim: true
    },
    url: {
        type: String,
        required: [true, 'Photo URL is required'],
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL'], // URL validation
        trim: true
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        trim: true,
        default: '' // Default description to an empty string
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album ID is required']
    }
});

// Export the schema
module.exports = photoSchema;
