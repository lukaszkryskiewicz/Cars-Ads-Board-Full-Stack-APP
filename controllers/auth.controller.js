const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const getImageFileType = require('../utils/getImageFileType')
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const avatar = req.file;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    if (login && password && avatar && phone &&
      typeof login === 'string' && typeof password === 'string' &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) && typeof parseInt(phone) === 'number') {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(avatar.path)
        return res.status(409).send({ message: 'User with this login already exists' })
      }
      const user = new User({ login, password: await bcrypt.hash(password, 10), avatar: avatar.filename, phone })
      await user.save();
      res.status(201).send({ message: 'User created ' + user.login })

    } else {
      fs.unlinkSync(avatar.path)
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
  try {
    const user = await User.findById(req.session.user.id)
    res.json(user)
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.logout = async (req, res) => {
  req.session.destroy();
  res.send({ message: 'user logout' })
}