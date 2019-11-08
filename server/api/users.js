const router = require('express').Router()
const {User, Cart, Treehouse} = require('../db/models')
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

router.get('/:userId/activeCart', async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.userId, {
      include: [{model: Cart, where: {active: true}}]
    })
    // console.log('singleUser', activeCart)
    const activeCartId = data.carts[0].id
    const treehousesInCart = await Cart.findByPk(activeCartId, {
      include: [{model: Treehouse}]
    })
    res.json(treehousesInCart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/carts', async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.userId, {
      include: [{model: Cart}]
    })
    const carts = data.carts
    const treehousesInCarts = await Promise.all(
      carts.map(cart => Cart.findByPk(cart.id), {
        include: [{model: Treehouse}]
      })
    )

    // let treehousesInCart;
    // carts.forEach(cart => treehousesInCart.push(await Cart.findByPk(cart.id)))

    res.json(treehousesInCarts)
  } catch (err) {
    next(err)
  }
})

// '/guest/cart'
