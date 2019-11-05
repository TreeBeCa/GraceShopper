const router = require('express').Router()
const {Treehouse} = require('../db/models')

router.get('/', async (req, res, next) => {
  const houses = await Treehouse.findAll()
  res.json(houses)
})

module.exports = router
