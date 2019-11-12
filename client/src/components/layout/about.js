import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class About extends React.Component {

  render() {
    return (
        <Container>
          <Row>
          <Col xs={12} sm={10} md={7}>
            <img src={require('../../styles/assets/images/tableSet.jpg')} className="img-fluid" width="100%" height="400px"
              style={{margin: '20px 20px', marginLeft: 'auto'}}
              alt='ABOUT'
            ></img>
            </Col>
            <Col md={5}>
            <div style={{ marginTop: '60px', justifyContent: 'center', alignItems: 'center', padding: '15px'}}>
              <h2 style={{ textAlign: 'center', padding: '20px'}}>ABOUT:</h2>
              <p>Eventage is application that stores and tracks all upcoming events for a fictitious company. Users can create a account through registering and logging in, 
                  they can then view, create and delete all upcoming events. </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            </Col>
            </Row>
        </Container>
    )
}


}

export default About;