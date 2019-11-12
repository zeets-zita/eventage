import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

import Container from 'react-bootstrap/Container';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';

class NavBar extends Component {

  state = {
    isOpen: false
  }
  
  toggle = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  logout = () => {
    const { logoutUser, history } = this.props;
    logoutUser(history);
  };

  render() {
    const { isAuthenticated, loading } = this.props.auth;

    const authLinks = (
      <Fragment>
          <Link className="nav-link" to="/events">
            EVENTS
          </Link>
          <Link className="nav-link" to="/dashboard">
            DASHBOARD
          </Link>
          <Link className="nav-link" to="/create">
            CREATE
          </Link>

          <Link className="nav-link" to="/" onClick={this.logout}>
            LOGOUT
          </Link>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
          <Link className="nav-link" to="/" style={{color: 'white'}}>
            HOME
          </Link>        
          <Link className="nav-link" to="/login" style={{color: 'white'}}>
            LOGIN
          </Link>
          <Link className="nav-link" to="/register" style={{color: 'white'}}>
            REGISTER
          </Link>
          <Link className="nav-link" to="/about" style={{color: 'white'}}>
            ABOUT
          </Link>
      </Fragment>
    );

    const renderLinks = () => {
      if (loading) {
        return ' Loading...';
      }
      if (isAuthenticated) {
        return authLinks;
      }
      return guestLinks;
    };

    return (
      <Navbar className="mainNav" light expand='sm'>
        <Container className="nav-container">
          <NavbarBrand id="navBrand" style={{color: 'white', padding: '10px', fontSize: '26px'}}>
            EVENTAGE
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="nav-list ml-auto">
              {renderLinks()}
            </Nav>
            </Collapse>
        </Container>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(NavBar));
