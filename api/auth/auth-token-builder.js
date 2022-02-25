const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/index')

function makeToken(users) {
    const payload = {
        subject: users.id,
        username: users.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = makeToken