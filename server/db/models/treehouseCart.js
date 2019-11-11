const Sequelize = require('sequelize')
const db = require('../db')

const TreehouseCart = db.define('TreehouseCart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = TreehouseCart
