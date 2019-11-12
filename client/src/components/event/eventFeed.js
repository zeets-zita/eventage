import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventDetail from './eventDetail'

class EventFeed extends Component {
  render() {
    const { events } = this.props
    return events.map( event => <EventDetail key={ event._id } event={ event } /> )
  }
}
EventFeed.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventFeed
