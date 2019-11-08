const router = require('express').Router()
const {Cart, TreehouseCart} = require('../db/models')

//mounted on api/carts
router.get('/', async (req, res, next) => {
  try {
    console.log('inside api/cart route')
    const trees = await Cart.findAll({
      include: [{association: TreehouseCart}]
    })
    console.log('treesCart table', trees)
    res.json(trees)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
