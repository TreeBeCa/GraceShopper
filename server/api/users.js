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

//this route is working great, and matches the
// data format expected by redux
router.get('/:userId/activeCart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const activeCart = await user.getActiveCart()
    const treehousesInCart = await activeCart.getTreehouses()

    res.json(
      treehousesInCart.map(treehouse => {
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
    user.address = req.body.address
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// the idea here is :operation can be "add" or "subtract"
router.put(
  '/:userId/activeCart/:operation/:houseId',
  async (req, res, next) => {
    const {userId, operation, houseId} = req.params
    try {
      // grab user's current 'active cart'
      const user = await User.findByPk(req.params.userId)
      const cart = await user.getActiveCart()

      //find the treehouse
      const house = await Treehouse.findByPk(houseId)
      // is this treehouse already in our cart?
      const treehouses = await cart.getTreehouses()
      const found = treehouses.find(elem => elem.id === house.id)
      if (found) {
        // if it is, adjust the quantity
        if (operation === 'add') {
          found.TreehouseCart.quantity++
        } else if (operation === 'remove') {
          found.TreehouseCart.quantity--
          if (found.TreehouseCart.quantity < 1) {
            await cart.removeTreehouse(house)
          }
        }
        found.TreehouseCart.save()
      } else if (operation === 'add') {
        // if not, and we want to add, add
        // decrimenting an item not in the cart does nothing
        await cart.addTreehouse(house.id, {through: {quantity: 1}})
      }
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:userId/activeCart/delete/:houseId', async (req, res, next) => {
  try {
    const {userId, houseId} = req.params
    // get active cart
    const user = await User.findByPk(userId)
    const activeCart = await user.getActiveCart()
    //query the house to delete
    const house = await Treehouse.findByPk(houseId)
    await activeCart.removeTreehouse(house)
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
      carts.map(cart =>
        Cart.findByPk(cart.id, {
          include: [{model: Treehouse}]
        }))
    )

    const formated = treehousesInCarts.map(current => ({
      id: current.id,
      active: current.active,
      total: current.total,
      orderDate: current.orderDate,
      treehouses: current.treehouses.map(elem => ({
        id: elem.id,
        name: elem.name,
        quantity: elem.TreehouseCart.quantity
      }))
    }))

    res.json(formated)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    // find user's current 'active cart'
    const user = await User.findByPk(req.params.userId, {
      include: [{model: Cart}]
    })
    const activeCart = user.carts.find(cart => cart.active === true)
    //total up the price
    let total = 0
    const treehouses = await activeCart.getTreehouses()

    treehouses.forEach(treehouse => {
      // console.log('treehouse.price', treehouse.price * 100)
      let formatPrice = treehouse.price * 100
      total += treehouse.TreehouseCart.quantity * formatPrice
    })
    console.log('checkout', total)
    activeCart.total = total

    // set the order date
    const now = new Date()
    activeCart.orderDate = now

    // set active to false
    activeCart.active = false

    activeCart.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
