// const UserModel = require('../models/user.js')

// const Users = class Users {
//   /**
//    * @constructor
//    * @param {Object} app
//    * @param {Object} connect
//    */
//   constructor (app, connect, authenticateToken) {
//     this.app = app
//     this.UserModel = connect.model('User', UserModel)
//     this.authenticateToken = authenticateToken

//     this.run()
//   }

//   /**
//    * Delete by id
//    */
//     deleteById () {
//       this.app.delete('/user/:id', this.authenticateToken, (req, res) => {
//         try {
//           this.UserModel.findByIdAndDelete(req.params.id).then((user) => {
//             res.status(200).json(user || {})
//           }).catch(() => {
//             res.status(500).json({
//               code: 500,
//               message: 'Internal Server error'
//             })
//           })
//         } catch (err) {
//           console.error(`[ERROR] users/:id -> ${err}`)
  
//           res.status(400).json({
//             code: 400,
//             message: 'Bad request'
//           })
//         }
//       })
//     }

//   /**
//    * Show by id
//    */
//   showById () {
//     this.app.get('/user/:id', this.authenticateToken,  (req, res) => {
//       try {
//         if (req.user.role === 'coach') {
//           this.UserModel.findById(req.params.id).then((user) => {
//             res.status(200).json(user || {})
//           }).catch(() => {
//             res.status(500).json({
//               code: 500,
//               message: 'Internal Server error'
//             })
//           })
//         } else {
//           res.status(401).json({
//             code: 401,
//             message: 'Unauthorized you are not a coach'
//           })
//         }
//       } catch (err) {
//         console.error(`[ERROR] users/:id -> ${err}`)

//         res.status(400).json({
//           code: 400,
//           message: 'Bad request'
//         })
//       }
//     })
//   }

//   /**
//    * Create
//    */
//   create () {
//     this.app.post('/user/', (req, res) => {
//       try {
//         const userModel = new this.UserModel(req.body)

//         userModel.save().then((user) => {
//           res.status(200).json(user || {})
//         }).catch(() => {
//           res.status(200).json({})
//         })
//       } catch (err) {
//         console.error(`[ERROR] users/create -> ${err}`)

//         res.status(400).json({
//           code: 400,
//           message: 'Bad request'
//         })
//       }
//     })
//   }

//   /**
//    * Run
//    */
//   run () {
//     this.create()
//     this.showById()
//     this.deleteById()
//   }
// }

// module.exports = Users


const UserModel = require('../models/user');

const Users = class Users {
  constructor(app, connect, authenticateToken) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);
    this.authenticateToken = authenticateToken;

    this.run();
  }

  /**
   * Show user by ID (Protected route)
   */
  showById() {
    this.app.get('/user/:id', this.authenticateToken, async (req, res) => {
      try {
        const user = await this.UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User Not Found!' });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Delete user by ID (Protected route)
   */
  deleteById() {
    this.app.delete('/user/:id', this.authenticateToken, async (req, res) => {
      try {
        const user = await this.UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User Not Found!' });
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  /**
   * Create new user (Public route)
   */
  create() {
    this.app.post('/user', async (req, res) => {
      const user = new this.UserModel(req.body);
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }

  /**
   * Run all routes
   */
  run() {
    this.create();    // Public
    this.showById();  // Protected
    this.deleteById();  // Protected
  }
};

module.exports = Users;
