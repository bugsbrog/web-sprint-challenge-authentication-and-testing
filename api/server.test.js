const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('sanity', () => {
  expect(true).toBe(true)
})

test('NODE_ENV is correct', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('jokes-router', () => {

  describe('[GET] /api/jokes', () => {
    let res
    beforeEach(async () => {
      res = await request(server).get('/api/jokes')
    })
    it('returns JSON', () => {
      expect(res.type).toBe('application/json')
    })
    it('returns a status code 401 because no token', async () => {
      expect(res.status).toBe(401)
    })
    it('returns error message for 401 error', () => {
      expect(res.body.message).toEqual('token required')
    })
  })
})

describe('auth-router', () => {

  describe('[POST] /api/auth/register', () => {
    it('returns error message if username is not in req.body', async () => {
      const res = await request(server)
          .post('/api/auth/register')
          .send({username: "", password: "1234"})
      expect(res.body.message).toBe('username and password required')
    })
    it('returns error message if password is not in req.body', async () => {
      const res = await request(server)
          .post('/api/auth/register')
          .send({username: "Hannah", password: ""})
      expect(res.body.message).toBe('username and password required')
    })
  })
  describe('POST /login', () => {
    test('returns status code 401 if user is not in db', async () => {
      const res = await request(server)
          .post('/api/auth/login')
          .send({ username: "randomUser", password: "1234" })
      expect(res.status).toBe(401)
    })
    it('returns error message if user is not in db', async () => {
      const res = await request(server)
          .post('/api/auth/login')
          .send({ username: "randomUser", password: "1234" })
      expect(res.body.message).toBe('invalid credentials')
    })
  })
})