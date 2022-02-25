const router = require('express').Router();
const {
    checkUsernameFree,
    checkUsernameExists,
} = require('../middleware/middleware')
const bcrypt = require('bcryptjs')
const makeToken = require('./auth-token-builder')

const Users = require('./auth-model')
const { BCRYPT_ROUNDS } = require('../secrets/index')

router.post('/register', checkUsernameFree, async (req, res, next) => {
  const { username, password } = req.body
    try {
      const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
      const newUser = await Users.add({ username, password: hash })
      res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', checkUsernameExists, (req, res, next) => {
    let { password } = req.body

    if (bcrypt.compareSync(password, req.user.password)) {
        const token = makeToken(req.user)
        res.json({
            message: `welcome, ${req.user.username}`, token
        })
    } else {
        next({
            status: 401,
            message: 'invalid credentials'
        })
    }
    /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
