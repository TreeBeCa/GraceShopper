const isAdminMiddleware = (req, res, next) => {
  console.log('inside admin middleware') //admin doesn't exist yet
  // next()
  const currUser = req.user
  if (currUser && currUser.isAdmin) {
    next()
  } else {
    const error = new Error("you're not an admin")
    error.status = 401
    next(error)
  }
}

const isUserMiddleware = (req, res, next) => {
  console.log('inside userMiddleware')
  // console.log('userMiddleware', req.user)
  // console.log('req.params.userId', req.params.userId)
  // console.log('req.user.id', req.user.id)

  if (req.user !== undefined) {
    const paramsUserId = parseInt(req.params.userId)
    if (paramsUserId === req.user.id) {
      console.log('matching ids')
      next()
    } else {
      console.log('not matching ids')
      const error = new Error("it doesn't look like anything to me")
      error.status = 401
      next(error)
    }
  } else {
    console.log('not matching ids')
    const error = new Error("it doesn't look like anything to me")
    error.status = 401
    next(error)
  }
}

module.exports = {
  isAdminMiddleware,
  isUserMiddleware
}
