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
    it('should return JSON', () => {
      expect(res.type).toBe('application/json')
    })
    it('returns a 401 error because no token', async () => {
      expect(res.status).toBe(401)
    })
    it('returns error message for 401 error', () => {
      expect(res.body.message).toEqual('token required')
    })
  })
})