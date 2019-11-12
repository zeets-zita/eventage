import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../../actions/eventActions';
import SelectListGroup from '../../common/SelectListGroup';

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


class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
        name: '',
        description: '',
        venue: '',
        day: '',
        time: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {

      this.setState({ errors: newProps.errors })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
        name: this.state.name,
        description: this.state.description,
        venue: this.state.venue,
        day: this.state.day,
        time: this.state.time
    }
    // add event via addEvent action
    this.props.addEvent(newEvent); 
    this.props.history.push('/events')
  }

  
  render() {

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
        <div className="post-form sm-2 create-container" style={{ marginTop: '90px'}}>
        <Col md={7} className="m-auto">
        <div className="card card-info">
          <CardHeader style={{color: 'white', backgroundColor: '#A7CAB1', padding: '20px'}}>
            CREATE NEW EVENT
          </CardHeader>
            <div className="card-body">
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="event">Event</Label>
                  <Input
                    type="text"
                    name="name"
                    id="event"
                    placeholder="Add new event"
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
                    onChange={this.onChange}>
                  </Input>
                    </Col>
                    <Col md={6}>
                  <Input
                    type="time"
                    name="time"
                    id="event"
                    placeholder="Time"
                    onChange={this.onChange}>
                  </Input>
                    </Col>
                    </Row>
                        <br/>
                  <SelectListGroup
                    name="venue"
                    id="event"
                    value={this.state.venue}
                    onChange={this.onChange}
                    options={options}/>
                        <br />
                  <Input
                    type="textarea"
                    name="description"
                    id="event"
                    placeholder="Description"
                    onChange={this.onChange}>
                  </Input>
                      <Button color="dark"
                      style={{marginTop: '20px'}}
                      block>
                   Add event
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
        </Col>
      </div>
    )
  }
}

Create.propTypes = {
  auth: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addEvent })(Create)
