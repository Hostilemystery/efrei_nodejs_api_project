// const mongoose = require('mongoose')

// const Schema = new mongoose.Schema({
//   firstname: {
//     type : String,
//     required : true
//   },
//   lastname: String,
//   age: Number,
//   city: String
// }, {
//   collection: 'users',
//   minimize: false,
//   versionKey: false
// }).set('toJSON', {
//   transform: (doc, ret) => {
//     ret.id = ret._id

//     delete ret._id
//   }
// })

// module.exports = Schema

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name cannot exceed 50 characters'],
        trim: true
    },
    lastname: {
        type: String,
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name cannot exceed 50 characters'],
        trim: true,
        default: '' // Default last name to empty string if not provided
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be less than 0'],
        max: [120, 'Age cannot exceed 120'],
        default: 0, // Default age to 0 if not provided
        validate: {
            validator: Number.isInteger,
            message: 'Age must be an integer'
        }
    },
    city: {
        type: String,
        maxlength: [100, 'City name cannot exceed 100 characters'],
        trim: true,
        default: 'Unknown' // Default city to "Unknown" if not provided
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    collection: 'users',
    minimize: false,
    versionKey: false
}).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
    }
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
    const user = this;

    // If the password has not been modified, skip hashing
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);  // Generate salt
        user.password = await bcrypt.hash(user.password, salt);  // Hash password
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


module.exports = userSchema;
