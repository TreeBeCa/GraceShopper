const router = require('express').Router()
const {Cart, Treehouse} = require('../db/models')

//mounted on api/cart
router.get('/', async (req, res, next) => {
  try {
    console.log('inside api/cart route')
    const trees = await Cart.findAll({
      include: [{model: Treehouse}]
    })
    console.log('treesCart table', trees)
    res.json(trees)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
