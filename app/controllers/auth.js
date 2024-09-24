const jwt = require('jsonwebtoken');

const Auth = class Auth {
  constructor(app) {
    this.app = app;
    this.run();
  }

  /**
   * Token generation route (example: login)
   */
  auth() {
    this.app.post('/auth/', (req, res) => {
      try {
        const { firstname, password } = req.body;

        // Sign a JWT using the secret key from .env
        const token = jwt.sign({ firstname, password }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send the token to the client
        res.status(200).json({ token });
      } catch (err) {
        console.error(`[ERROR] auth -> ${err}`);
        res.status(400).json({ message: 'Bad request' });
      }
    });
  }

  run() {
    this.auth();
  }
};

module.exports = Auth;


