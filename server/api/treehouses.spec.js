/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Treehouse = db.model('treehouse')

describe('Treehouse routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/treehouses/', () => {
    const testTreehouse = {
      name: 'Basic Tree House',
      description: 'Budget-friendly and easily installed',
      price: 9999,
      imageUrl:
        'https://i.pinimg.com/originals/be/4a/0e/be4a0eb411a219b65b05554c0dd7f9b2.jpg'
    }

    beforeEach(() => {
      return Treehouse.create(testTreehouse)
    })

    it('GET /api/treehouses', async () => {
      const res = await request(app)
        .get('/api/treehouses')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(testTreehouse.name)
    })
  }) // end describe('/api/treehouse')
}) // end describe('Trehouse routes')
