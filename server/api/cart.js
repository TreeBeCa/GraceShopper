const router = require('express').Router()
const {Cart} = require('../db/models')

//mounted on api/cart
router.get('/', async (req, res, next) => {
  // const insideCart =
  res.json('hello')
})

module.exports = router
