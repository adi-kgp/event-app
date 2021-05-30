import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getEvents } from '../../actions/event'
import EventItem from './EventItem'
import EventForm from './EventForm'

const Events = ({ getEvents, event: { events } }) => {
  useEffect(() => {
    getEvents()
  }, [getEvents])

  return (
    <>
      <h1 className='large text-primary'>Events</h1>
      <EventForm />
      <p className='lead'>Events List</p>
      <div>
        {events.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>
    </>
  )
}

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  event: state.event,
})

export default connect(mapStateToProps, { getEvents })(Events)
