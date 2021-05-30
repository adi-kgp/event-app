import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEvent } from '../../actions/event'

const EventForm = ({ addEvent }) => {
  const [formData, setformData] = useState({
    title: '',
    description: '',
  })

  const { title, description } = formData

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    addEvent({ title, description })
    setformData({
      title: '',
      description: '',
    })
  }

  return (
    <div className='event-form'>
      <div className='bg-primary p'>
        <h3>Create an Event...</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <textarea
            name='title'
            cols='30'
            rows='1'
            placeholder='Create a title'
            value={title}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Create a description'
            value={description}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
        </div>

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
}

export default connect(null, { addEvent })(EventForm)
