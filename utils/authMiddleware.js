const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    console.log(req.session)
    next();
  } else {
    res.status(401).send({ message: 'no permission' })
  }
}

module.exports = authMiddleware;