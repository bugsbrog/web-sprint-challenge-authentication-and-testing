const router = require('express').Router();
const {
    checkUsernameFree,
    checkUsernameExists,
    checkCredentials
} = require('../middleware/middleware')
const bcrypt = require('bcryptjs')
const makeToken = require('./auth-token-builder')

const Users = require('./auth-model')
const { BCRYPT_ROUNDS } = require('../secrets/index')

router.post('/register', checkUsernameFree, checkCredentials, async (req, res, next) => {
  const { username, password } = req.body
    try {
      const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
      const newUser = await Users.add({ username, password: hash })
      res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
});

router.post('/login', checkUsernameExists, checkCredentials, (req, res, next) => {
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
});

module.exports = router;
