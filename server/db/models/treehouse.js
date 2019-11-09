const Sequelize = require('sequelize')
const db = require('../db')

const Treehouse = db.define('treehouse', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
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
