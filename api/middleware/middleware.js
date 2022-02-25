const Auth = require("../auth/auth-model");

const checkUsernameFree = async (req, res, next) => {
    const { username } = req.body
        try {
            const [user] = await Auth.findBy({ username })
                if (user) {
                    next({
                        status: 422,
                        message: 'username taken'
                    })
                } else {
                    next()
                }
            } catch (err) {
                next(err)
            }
}

const checkUsernameExists = async (req, res, next) => {

}

const checkCredentials = (req, res, next) => {

}

module.exports = {
    checkUsernameFree,
    checkUsernameExists,
    checkCredentials
}