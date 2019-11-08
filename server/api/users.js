const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.get('/:id/profile', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const limitedData = {email: user.email, id: user.id}
    res.json(limitedData)
  } catch (err) {
    next(err)
  }
})

// router.put('/:id/profile', async (req, res, next) => {
//   try {
//     const userId = req.params.id
//     const userCurData = req.body
//     const updatedUser = await User.update(userCurData, {
//       returning: true,
//       where: {
//         id: userId,
//         email: userCurData.email
//       }
//     })
//     // await updatedUser.save()
//     res.send(updatedUser)
//     // if (updatedUser) {
//     //   console.log(updatedUser)
//     //   res.status(200).json("update success!")
//     // } else {
//     //   res.status(404).send("ERROR!!")
//     // }
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/:id/profile', async (req, res, next) => {
  try {
    const newInfo = req.body
    const user = await User.findByPk(req.params.id)
    console.log(user)
    user.email = newInfo.email
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})
