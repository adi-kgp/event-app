const express = require('express')
const auth = require('../../middleware/auth')
const Event = require('../../models/Event')
const User = require('../../models/User')
const config = require('config')
const { check, validationResult } = require('express-validator')
const router = express.Router()

// @route POST api/event
// @desc Create or update an event
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // build event object
      const { title, description } = req.body

      const user = await User.findById(req.user.id).select('-password')

      const newEvent = new Event({
        title: title,
        description: description,
        name: user.name,
        user: req.user.id,
      })
      // create event
      const event = await newEvent.save()
      return res.json(event)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)
// @route GET api/events
// @desc get all events
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 })
    res.json(events)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route DELETE api/events/:id
// @desc Delete a post
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    //check user
    if (!event) {
      return res.status(404).json({ msg: 'event not found' })
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' })
    }
    await event.remove()
    res.json({ msg: 'event removed' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'event not found' })
    }
    res.status(500).send('server error')
  }
})

module.exports = router
