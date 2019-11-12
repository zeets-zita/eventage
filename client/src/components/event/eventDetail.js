import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEvent } from '../../actions/eventActions';

import { 
  Container,
  Card, 
  Button, 
  CardHeader,  
  CardBody, 
  CardText,
  Row,
  Col
} from 'reactstrap';

class EventDetail extends Component {

  onDeleteClick(id) {
    this.props.deleteEvent(id)
  }
  
  render() {
    const { event, auth, showActions } = this.props
    return (
        <Container style={{ marginTop: '10px'}}>
          <Card>
            <CardHeader style={{ color: '#595959', backgroundColor: '#F4ECD6'}}>
            <Row>
                <Col>
              <h4>{ event.name }</h4>
                </Col>
                <Col>
              <div className='event-date'>
               <p> {event.day} {event.time}</p>
              </div>
                </Col>
            </Row>
            </CardHeader>
            <br />
          <CardBody>
            <CardText>
              <div style={{ fontSize: '18px', marginTop: '-20px'}}>
              { event.venue }
              </div>
              <br />
              { event.description }
            </CardText>
              { showActions ? (<span>
              <Row style={{ marginLeft: '240px', marginTop: '-15px'}}>
                <Col sm={{ size: 'auto', offset: 10 }} > 
              <Link to={`/edit/${event._id}`} className="btn btn-info mr-1"
              style={{ backgroundColor: '#7F7F7F', border: 'none' }}>
                Edit
              </Link>
            { event.user === auth.user.id ?
                ( <Button onClick={this.onDeleteClick.bind(this, event._id)} type="button" className="btn mr-1"
                style={{ backgroundColor: '#BC8C80', border: 'none', marginLeft: '3px' }}>
                  &times;
                </Button> )
                : null
            }
            </Col>
            </Row>
            
              </span>)
              : null }
          </CardBody>
        </Card>
      </Container>
    )
  }
}

EventDetail.defaultProps = {
  showActions: true
}

EventDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteEvent })(EventDetail)
