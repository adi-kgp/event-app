const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const config = require('config')

// @route POST api/users
// @desc Register user
// @access public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // see if user exists
    const { name, password, email } = req.body

    try {
      let user = await User.findOne({ email }) // email:email
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists with that email' }] })
      }
      // create User instance
      user = new User({
        name,
        email,
        password,
      })
      //encrypt password
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()
      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id, // mangoose abstraction of _id
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token }) // status 200
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
)

module.exports = router