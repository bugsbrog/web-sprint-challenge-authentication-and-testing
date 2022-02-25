const Auth = require("../auth/auth-model");

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body
        try {
            const [user] = await Auth.findById({ username })
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
    checkUsernameExists,
    checkCredentials
}