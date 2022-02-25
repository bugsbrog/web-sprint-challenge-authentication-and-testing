const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users').where(filter)
}

function findById(user_id) {
    return db('users')
        .where('user_id', user_id)
        .first()
}

async function add(newUser) {
    const [user_id] = await db('users').insert(newUser)
    return findById(user_id)
}

module.exports = {
    findBy,
    findById,
    add
}