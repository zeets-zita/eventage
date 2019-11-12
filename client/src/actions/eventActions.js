import axios from 'axios'
import {
    GET_EVENTS,
    GET_EVENT,
    ADD_EVENT,
    DELETE_EVENT,
    EVENTS_LOADING,
    GET_ERRORS,
    UPDATE_EVENT,
    CLEAR_ERRORS
} from './types';


// Add Event
export const addEvent = event => dispatch => {
    dispatch(clearErrors())
    axios.post('/api/events', event)
      .then(res => dispatch({
        type: ADD_EVENT,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
  
  // Get Events
  export const getEvents = () => dispatch => {
    dispatch(setEventsLoading())
    axios.get('/api/events')
      .then(res => dispatch({
        type: GET_EVENTS,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_EVENTS,
        payload: null
      }))
  }
  
  
  // Get Event
  export const getEvent = id => dispatch => {
    dispatch(setEventsLoading())
    axios.get(`/api/events/${id}`)
      .then(res => dispatch({
        type: GET_EVENT,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_EVENT,
        payload: null
      }))
  }
  
  
  // Delete Event
  export const deleteEvent = id => dispatch => {
    axios.delete(`/api/events/${id}`)
      .then(res => dispatch({
        type: DELETE_EVENT,
        payload: id
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
  
  // Edit Event
  export const updateEvent = ( id, fields ) => dispatch => {
    const request = axios.put(`/api/events/${id}`, fields );
    return {
       type: UPDATE_EVENT,
       payload: request
    }
 }

  // Set Events loading
  export const setEventsLoading = () => {
    return {
      type: EVENTS_LOADING
    }
  }
  
  // Clear errors
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    }
  }
  
  