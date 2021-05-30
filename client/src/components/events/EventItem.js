import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEvent } from '../../actions/event'

const EventItem = ({
  deleteEvent,
  auth,
  event: { _id, name, user, title, description, date },
  showActions,
}) => {
  return (
    <div className='event bg-white p-1 my-1'>
      <div className=' p'>
        <h4>{name}</h4>
      </div>
      <div>
        <h4 className=' my-1'>{title}</h4>
        <p className='my-1'>{description}</p>
        <p className='event-date'>
          Posted on <Moment format='YYYY/MM/DD hh:mm'>{date}</Moment>
        </p>
        {showActions && (
          <>
            {user === auth.user._id && (
              <button
                type='button'
                onClick={(e) => deleteEvent(_id)}
                className='btn btn-danger'
              >
                Delete Event
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

EventItem.defaultProps = {
  showActions: true,
}

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteEvent })(EventItem)
