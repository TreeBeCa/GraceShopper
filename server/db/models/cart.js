const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  total: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    get() {
      return this.getDataValue('total') / 100
    }
  },
  orderDate: {
    type: Sequelize.DATE
  }
})

module.exports = Cart
