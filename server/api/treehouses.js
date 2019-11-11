const router = require('express').Router()
const {Treehouse} = require('../db/models')

router.get('/', async (req, res, next) => {
  const houses = await Treehouse.findAll()
  res.json(houses)
})

router.get('/:id', async (req, res, next) => {
  try {
    const treehouseById = await Treehouse.findByPk(req.params.id)
    res.json(treehouseById)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
