const router = require('express').Router()
// const {Treehouse} = require('../db/models')

//mounted on api/cart
router.get('/', async (req, res, next) => {
  res.json('hello')
})

module.exports = router
