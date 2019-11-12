import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import EventFeed from './eventsFeed'
import Spinner from '../common/Spinner'
import { getEvents } from '../../actions/eventActions'

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents()
  }
  render() {
    const { events, loading } = this.props.event
    let eventContent
    if(events === null || loading === true) {
      eventContent = <Spinner />
    } else {
      eventContent = <EventFeed events={ events } />
    }
    return (
      <div className="feed">
        <div className="container">
        <Link to="/create" className="btn btn-light mb-3"
        style={{marginTop: '30px'}}
        >Create</Link>
          <div className="row">
            <div className="col-md-12">
              { eventContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EventsList.propTypes = {
  event: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, { getEvents })(EventsList)
