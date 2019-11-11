const isAdminMiddleware = (req, res, next) => {
  const currUser = req.user
  if (currUser && currUser.isAdmin) {
    next()
  } else {
    const error = new Error("it doesn't look like anything to me")
    error.status = 401
    next(error)
  }
}

const isUserMiddleware = (req, res, next) => {
  if (req.user) {
    console.log('inside middleware', req.params.userId)
    console.log('inside middleware', req.user.id)
    const currUserId = req.user.id
    if (currUserId === req.params.userId) {
      next()
    } else {
      const error = new Error("it doesn't look like anything to me")
      error.status = 401
      next(error)
    }
  } else {
    next()
  }
}

module.exports = {
  isAdminMiddleware,
  isUserMiddleware
}
