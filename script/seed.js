'use strict'

const db = require('../server/db')
const {User, Treehouse} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const houses = [
    {
      name: 'Basic Tree House',
      description: 'Budget-friendly and easily installed',
      price: 99.99,
      imageUrl:
        'https://i.pinimg.com/originals/be/4a/0e/be4a0eb411a219b65b05554c0dd7f9b2.jpg'
    },
    {
      name: 'Intermediate Tree House',
      description: 'Mild investment and needs a picture manual',
      price: 299.99,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/U0OW7c-xhdZy78ExiV2z3nPwegc=/0x0:1437x960/1200x800/filters:focal(605x366:833x594)/cdn.vox-cdn.com/uploads/chorus_image/image/64044960/756e6baf_ef2d_4cb6_a57e_7c5b8efaff65.0.jpg'
    },
    {
      name: 'Advanced Tree House',
      description: 'Liquify your assets & hire professionals off the street',
      price: 1199.99,
      imageUrl:
        'https://dch81km8r5tow.cloudfront.net/wp-content/uploads/2015/01/Key-Projects_Sharma-02-818x545_VSCO-958x559.jpg'
    }
  ]

  await Promise.all(
    houses.map(house => {
      return Treehouse.create(house)
    })
  )

  console.log(`seeded ${houses.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
