const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  firstname: {
    type : String,
    required : true
  },
  lastname: String,
  age: Number,
  city: String
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema