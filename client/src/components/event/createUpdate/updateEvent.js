import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SelectListGroup from '../../common/SelectListGroup';
import { getEvent, updateEvent } from '../../../actions/eventActions';

import { 
  Button,
  Form,
  FormGroup,
  Label, 
  Input, 
  Row, 
  Col,
  CardHeader
} from 'reactstrap';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      venue: '',
      day: '',
      time: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const eventId = this.props.match.params.id;
    this.props.getEvent(eventId);
    for(let eventProperty in this.props.event.event) {
      this.setState({ [eventProperty]: this.props.event.event[eventProperty] });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const eventId = this.props.match.params.id;
    const eventToUpdate = {
      name: this.state.name,
      description: this.state.description,
      venue: this.state.venue,
      day: this.state.day,
      time: this.state.time,
    };
    this.props.updateEvent(eventId, eventToUpdate, this.props.history);
    this.props.history.push('/events');
  }

  render() {
    const eventId = this.props.match.params.id;

    const options = [
      { label: 'Select Room/Venue', value: 0 },
      { label: '1st Floor, Room A', value: '1st Floor, Room A' },
      { label: '1st Floor, Room B', value: '1st Floor, Room B' },
      { label: '1st Floor, Room C', value: '1st Floor, Room C' },
      { label: '2nd Floor, Room E', value: '2nd Floor, Room E' },
      { label: '2nd Floor, Room D', value: '2nd Floor, Room D' },
      { label: '2nd Floor, Room F', value: '2nd Floor, Room F' },
      { label: '2nd Floor, Room G', value: '2nd Floor, Room G' }
    ]

    return (
      <div>
      <Link  to={`/event/${eventId}`} className="btn btn-light mb-3"
        style={{marginTop: '30px'}}
      >Back To Event</Link>
      <div className="post-form sm-2 update-container" style={{ marginTop: '10px'}}>
        <Col md={7} className="m-auto">
          <div className="card card-info">
          <CardHeader style={{color: 'white', backgroundColor: '#A7CAB1', padding: '20px'}}>
            EDIT EVENT
          </CardHeader>
          <hr />
            <div className="card-body">
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="event">Event</Label>
                  <Input
                    type="text"
                    name="name"
                    id="event"
                    placeholder="Add new event"
                    value={this.state.name}
                    error={this.state.errors.name}
                    onChange={this.onChange}>
                  </Input>
                        <br/>
                    <Row form>
                    <Col md={6}>
                  <Input
                    type="date"
                    name="day"
                    id="event"
                    placeholder="Date"
                    value={this.state.day}
                    error={this.state.errors.day}
                    onChange={this.onChange}>
                  </Input>
                    </Col>
                    <Col md={6}>
                  <Input
                    type="time"
                    name="time"
                    id="event"
                    placeholder="Time"
                    value={this.state.time}
                    error={this.state.errors.time}
                    onChange={this.onChange}>
                  </Input>
                    </Col>
                    </Row>
                        <br/>
                  <SelectListGroup
                    name="venue"
                    id="event"
                    value={this.state.venue}
                    error={this.state.errors.venue}
                    onChange={this.onChange}
                    options={options}/>
                        <br />
                  <Input
                    type="textarea"
                    name="description"
                    id="event"
                    placeholder="Description"
                    value={this.state.description}
                    error={this.state.errors.description}
                    onChange={this.onChange}>
                  </Input>
                      <Button color="dark"
                      style={{marginTop: '20px'}}
                      block>
                   Update event
                </Button>
              </FormGroup>
            </Form>
           </div>
          </div>
        </Col>
      </div>
      </div>
    )
  }
}

Edit.propTypes = {
  getEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  event: state.event,
  errors: state.errors
});

export default connect(mapStateToProps, { getEvent, updateEvent })(Edit);
