/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Treehouse = db.model('treehouse')

describe('Treehouse model', () => {
  let treehouse
  beforeEach(() => {
    treehouse = Treehouse.build({
      name: 'Basic Tree House',
      description: 'Budget-friendly and easily installed',
      price: 9999,
      imageUrl:
        'https://i.pinimg.com/originals/be/4a/0e/be4a0eb411a219b65b05554c0dd7f9b2.jpg'
    })
    return db.sync({force: true})
  })

  describe('attribute definition', () => {
    it('requires price to be positive integer', async () => {
      treehouse.price = -10
      let result, error
      try {
        result = await treehouse.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when price is negative')
      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.contain('Validation error')
    })

    it('requires name ', async () => {
      treehouse.name = ''
      let result, error
      try {
        result = await treehouse.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when name is empty')
      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.contain('Validation error')
    })
  })
}) // end describe('Treehouse model')
