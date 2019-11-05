const Sequelize = require('sequelize')
const db = require('../db')

const Treehouse = db.define('treehouse', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://www.herniamovers.com/assets/boxes_packages/large/image_not_available.gif'
  }
})

module.exports = Treehouse
