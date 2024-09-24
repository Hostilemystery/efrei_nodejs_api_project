// const mongoose = require("mongoose")

// const albumSchema = new mongoose.Schema({
//     title:{
//         type: String,
//         required:true
//     },
//     description:String,
//     photos:[{
//         type : mongoose.Schema.Types.ObjectId, 
//         ref:'Photo',
//     }]
// });

// module.exports = albumSchema

const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
        trim: true
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        trim: true,
        default: '' 
    },
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo'
    }]
});

// Export the schema
module.exports = albumSchema;
