const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users')
        .where('id', id)
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