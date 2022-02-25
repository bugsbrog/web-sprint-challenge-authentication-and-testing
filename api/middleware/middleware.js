const User = require("../auth/auth-model");
const db = require('../../data/dbConfig')

async function checkUsernameFree(req, res, next) {
    const { username } = req.body
    try {
        const [user] = await User.findBy({ username })
        if (user) {
            next({
                status: 422,
                message: 'Username taken'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function checkUsernameExists (req, res, next) {
    try {
        const username = await db('users').where('username', req.body.username).first()
               if (username) {
                   req.user = username
                    next()
                } else {
                    next({
                       status: 401,
                       message: 'invalid credentials'
                    })
                }
            } catch (err) {
                next(err)
            }
}

async function checkCredentials (req, res, next) {
    const { username, password } = req.body
        try {
            if (!username || !password) {
                next({
                    status: 401,
                    message: 'username and password required'
                })
            }
        } catch (err) {
            next(err)
        }

}

module.exports = {
    checkUsernameFree,
    checkUsernameExists,
    checkCredentials
}