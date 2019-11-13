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
    type: Sequelize.DATE,
    get() {
      const date = this.getDataValue('orderDate')
      if (date) return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      return ''
    }
  }
})

module.exports = Cart
