import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { 
  Container,
  ListGroup,
  ListGroupItem, 
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Col
} from 'reactstrap';

class EventItem extends Component {

  
  render() {
    const { event, showActions } = this.props
    return (
        <Container style={{ marginTop: '10px', backgroundColor: 'white'}}>
          <ListGroup>
            <ListGroupItem style={{ color: '#595959', backgroundColor: '#F4F4E3'}}>
              <Row>
                <Col>
              <ListGroupItemHeading style={{margin: '20px'}}>
               { event.name } 
              </ListGroupItemHeading>
               </Col>
               <div style={{float:'right', fontSize: '16px', marginTop: '10px'}}>
                <ListGroupItemText style={{float: 'right', textAlign: 'right'}}>
                  <Col md={{ size: '8', offset: 4 }}>
                    {event.day} {event.time}
                  { showActions ? (<span>
                  <Link to={`/event/${event._id}`} className="btn btn-info"
                  style={{ backgroundColor: '#7F7F7F', border: 'none' }}>
                    More Info
                  </Link>
                  </span>)
                  : null }
                  </Col>
              </ListGroupItemText>
              </div>
             </Row>
          </ListGroupItem>
        </ListGroup>
      </Container>
    )
  }
}

EventItem.defaultProps = {
  showActions: true
}

EventItem.propTypes = {
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(EventItem)
