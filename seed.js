const {green, red} = require('chalk')
const db = require('./server/db/db')
const {Treehouse} = require('./server/db/models')

const houses = [
  {
    name: 'Basic Tree House',
    description: 'Budget-friendly and easily installed',
    price: 99.99,
    imageUrl:
      'https://i.pinimg.com/originals/be/4a/0e/be4a0eb411a219b65b05554c0dd7f9b2.jpg'
  }
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(
    houses.map(house => {
      return Treehouse.create(house)
    })
  )

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
