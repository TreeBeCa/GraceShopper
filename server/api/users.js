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
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/activeCart', async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.userId, {
      include: [{model: Cart}]
    })
    const activeCart = data.carts.find(cart => cart.active === true)

    if (activeCart) {
      const activeCartId = activeCart.id
      const treehousesInCart = await Cart.findByPk(activeCartId, {
        include: [{model: Treehouse}]
      })
      res.json(
        treehousesInCart.treehouses.map(treehouse => {
          return {
            treehouse: {
              id: treehouse.id,
              name: treehouse.name,
              price: treehouse.price,
              description: treehouse.description
            },
            quantity: treehouse.TreehouseCart.quantity
          }
        })
      )
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/activeCart', async (req, res, next) => {
  const newCartData = req.body
  try {
    // find user's current 'active cart', if any
    const user = await User.findByPk(req.params.userId, {
      include: [{model: Cart}]
    })
    const activeCart = user.carts.find(cart => cart.active === true)

    let cart
    if (activeCart) {
      const activeCartId = user.carts[0].id
      cart = await Cart.findByPk(activeCartId, {
        include: [{model: Treehouse}]
      })
    } else {
      cart = await Cart.create({active: true})
      await cart.setUser(user)
    }

    // remove all the old order treehouses
    // for some reason this doesn't seem to work :(
    // cart.treehouses.forEach(async treehouse => {
    //   await cart.removeTreehouse(treehouse)
    // })

    // add in the new treehouses
    newCartData.forEach(async function(elem) {
      try {
        await cart.addTreehouse(elem.treehouse.id, {
          through: {quantity: elem.quantity}
        })
      } catch (error) {
        next(error)
      }
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
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
