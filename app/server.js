// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// Dependencies middleware
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

//Limit Ip 
const rateLimit = require('express-rate-limit');

// Core
const config = require('./config.js')
const routes = require('./controllers/routes.js')

require('dotenv').config(); 
const fs = require('fs');
const https = require('https');


/**
 * Server
 */
module.exports = class Server {
  constructor () {
    this.app = express()
    this.config = config[process.argv[2]] || config.development
  }

  /*
   * db connect
   * @return {Object} connect
   */
  dbConnect () {
    const host = this.config.mongodb
    const connect = mongoose.createConnection(host)

    connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] users api dbConnect() -> mongodb error')
        this.connect = this.dbConnect(host)
      }, 5000)

      console.error(`[ERROR] users api dbConnect() -> ${err}`)
    })

    connect.on('disconnected', (err) => {
      setTimeout(() => {
        console.log('[DISCONNECTED] users api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] users api dbConnect() -> close mongodb connection')
        process.exit(0)
      })
    })

    return connect
  }

  /**
   * Middleware
   */
  middleware () {

    //IP limiter 
    const limiter = rateLimit(config.rateLimit);
  
    //On utilise le limiteur sur toutes les requetes
    // this.app.use(limiter);

    this.app.use(compression())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
    this.app.use(bodyParser.json())
  }


 

  /**
   * Routes
   */
  routes () {
    
    new routes.Users(this.app, this.connect, this.authenticateToken)
    new routes.Auth(this.app)
    new routes.Albums(this.app,this.connect,this.authenticateToken)
    new routes.Photos(this.app,this.connect,this.authenticateToken)

    // If route not exist
    this.app.use((req, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Not Found'
      })
    })
  }

  /**
   * Security
   */
  security () {
    this.app.use(helmet())
    this.app.disable('x-powered-by')
  }

  // authenticateToken(req, res, next) {
  //   const token = req.headers['authorization']

  //   if (!token) return res.sendStatus(403)

  //   // jwt.verify(token, 'webforce3', (err, user) => {
  //   //   if (err) return res.sendStatus(401)

  //   //   req.user = user

  //   //   next()
  //   // })

  //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(401); // If the token is invalid or expired, return 401 Unauthorized

  //   req.user = user;  // Attach the decoded token data (e.g., user info) to the request object

  //   next();  // Proceed to the next middleware or route handler
  // });
  // }


   // Middleware to protect routes
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
      return res.status(403).json({ message: 'Token is required' }); 
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' }); 
      }

      req.user = user;  
      next();  
    });
  }


  

  /**
   * Run
   */
  run () {
    try {
      this.connect = this.dbConnect()
      this.security()
      this.middleware()
      this.routes()

     // Load SSL certificate and key from environment variables
      const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
      const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');

      const credentials = { key: privateKey, cert: certificate };

      // Create an HTTPS server
      https.createServer(credentials, this.app).listen(this.config.port, () => {
        console.log(`Server running on https://localhost:${this.config.port}`);
      });
      // this.app.listen(this.config.port)
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`)
    }
  }
}
