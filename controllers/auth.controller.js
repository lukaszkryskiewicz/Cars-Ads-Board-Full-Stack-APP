const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  try {

    const { login, password, avatar, phone } = req.body;

    if (login && password && avatar && phone &&
      typeof login === 'string' && typeof password === 'string' &&
      typeof avatar === 'string' && typeof parseInt(phone) === 'number') {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res.status(409).send({ message: 'User with this login already exists' })
      }
      const user = new User({ login, password: await bcrypt.hash(password, 10), avatar, phone })
      await user.save();
      res.status(201).send({ message: 'User created ' + user.login })

    } else {
      res.status(400).send({ message: 'Bad request' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }



}

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && password && typeof login === 'string' && typeof password === 'string') {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = { login: user.login, id: user._id };
          res.status(200).send({ message: 'Login successful' })
        } else {
          res.status(400).send({ message: 'Login or password are incorrect2' });
        }

      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.getUser = async (req, res) => {
  res.send('yes i am logged')
}

exports.logout = async (req, res) => {
  req.session.destroy();
  res.send({ message: 'user logout' })
}