require('dotenv').config();

module.exports = {
  development: {
    type: 'development',
    port: 3000,
    mongodb: process.env.MONGODB_URI,
    // mongodb: 'mongodb+srv://root:root@demo.v4muu5b.mongodb.net/ecole?retryWrites=true&w=majority'
    rateLimit: {
      windowMs: 15 * 60 * 1000, 
      max: 100,
      message: 'Too many requests from this IP, please try again later.'
    }

  },
  production: {
    type: 'production',
    port: 3000,
    mongodb: process.env.MONGODB_URI,
    rateLimit: {
      windowMs: 15 * 60 * 1000, 
      max: 100,
      message: 'Too many requests from this IP, please try again later.'
    }
  }
}