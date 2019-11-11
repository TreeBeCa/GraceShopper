const User = require('./user')
const Treehouse = require('./treehouse')
const Cart = require('./cart')
const TreehouseCart = require('./treehouseCart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsTo(User)
User.hasMany(Cart)

Treehouse.belongsToMany(Cart, {through: TreehouseCart})
Cart.belongsToMany(Treehouse, {through: TreehouseCart})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Treehouse,
  Cart
}
