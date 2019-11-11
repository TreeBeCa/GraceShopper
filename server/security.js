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

module.exports = isAdminMiddleware
