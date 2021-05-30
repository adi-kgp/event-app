import {
  GET_EVENTS,
  EVENT_ERROR,
  DELETE_EVENT,
  ADD_EVENT,
} from '../actions/types'

const initialState = {
  events: [],
  event: null,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
      }
    case ADD_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
      }
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
      }
    default:
      return state
  }
}
