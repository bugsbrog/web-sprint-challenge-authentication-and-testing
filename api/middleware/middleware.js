const User = require("../auth/auth-model");

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

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body
        try {
            const [user] = await User.findById({ username })
                if (!user) {
                    next({
                       status: 401,
                       message: 'invalid credentials'
                    })
                } else {
                    req.user = user
                    next()
                }
            } catch (err) {
                next(err)
            }
}

const checkCredentials = (req, res, next) => {

}

module.exports = {
    checkUsernameFree,
    checkUsernameExists,
    checkCredentials
}