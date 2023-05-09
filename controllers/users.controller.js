const User = require('../models/User.model')

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id)
    res.json(user)
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
} 