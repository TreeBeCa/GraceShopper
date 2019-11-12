const router = require('express').Router()
const {User, Cart} = require('../db/models')
module.exports = router

//mounted on api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      include: [{model: Cart}]
    })
    console.log('singleUser', singleUser)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const activeCart = await User.findByPk(req.params.userId, {
      include: [{model: Cart, where: {active: true}}]
    })
    console.log('singleUser', activeCart)
    res.json(activeCart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/profile', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const limited = {
      email: user.email,
      id: user.id,
      username: user.username,
      profileImgUrl: user.profileImgUrl
    }
    res.json(limited)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/profile', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    user.name = req.body.name
    user.email = req.body.email
    user.username = req.body.username
    user.profileImgUrl = req.body.profileImgUrl
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// '/guest/cart'
