import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import EventDetail from './eventDetail'
import Spinner from '../common/Spinner'
import { getEvent } from '../../actions/eventActions'

class Event extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id)
  }
  render() {
    const { event, loading } = this.props.event
    let eventContent

    if(event === null || loading === true) {
      eventContent = <Spinner />
    } else {
      eventContent = <EventDetail event={ event } />
    }
    return (
      <div className="event">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/events" className="btn btn-light mb-3"
              style={{marginTop: '30px'}}
              >Back To Events</Link>
              { eventContent }
            </div>
          </div>
        </div>
    </div>
    )
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  event: state.event
})

export default connect(mapStateToProps, { getEvent })(Event)
