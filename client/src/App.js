import React, { Component, Fragment } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/authActions';
import PropTypes from 'prop-types';

import PrivateRoute from './components/common/PrivateRoute';
import NavBar from './components/layout/navBar';
import Landing from './components/layout/landing/landingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EventsList from './components/events/eventsList';
import Event from './components/event/event';
import Create from './components/event/createUpdate/createEvent';
import Edit from './components/event/createUpdate/updateEvent';
import Dashboard from './components/dashboard/dashboard';
import About from './components/layout/about';

const NotFound = () => <h2>404 Not Found</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/events" component={ EventsList } />
              <PrivateRoute exact path="/event/:id" component={ Event } />
              <PrivateRoute exact path="/create" component={ Create } />
              <PrivateRoute exact path="/edit/:id" component={Edit} />
              <Route component={NotFound} />
            </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchUser }
)(App);
