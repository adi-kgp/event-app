import axios from 'axios'
import { setAlert } from './alert'
import { GET_EVENTS, EVENT_ERROR, DELETE_EVENT, ADD_EVENT } from './types'

// Get events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/events')
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete Event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/events/${id}`)
    dispatch({
      type: DELETE_EVENT,
      payload: id,
    })
    dispatch(setAlert('Event Removed', 'success'))
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add Event
export const addEvent = (formData) => async (dispatch) => {
  const config = {
    // whenever data is sent, config with headers is required
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post('/api/events', formData, config)
    dispatch({
      type: ADD_EVENT,
      payload: res.data,
    })
    dispatch(setAlert('Event Added', 'success'))
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
