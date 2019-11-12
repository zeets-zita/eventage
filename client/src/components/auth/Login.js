import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from '../common/FormField';
import { submitLogin, clearErrors } from '../../actions/authActions';
import { Form, Row, Col, Button } from 'reactstrap';

import './style.css'

const loginFields = [
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password' }
];

class Login extends Component {
  
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderFields() {
    return loginFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          type={name}
          name={name}
          label={label}
          placeholder={label}
          component={FormField}
        />
      );
    });
  }

  onSubmit = formValues => {
    this.props.submitLogin(formValues, this.props.history);
  };

  render() {
    const {
      handleSubmit
    } = this.props;
    const { loading } = this.props.auth;

  return (
    <Row className="login" style={{ marginTop: '20px'}}>
      <Col md={5} className="m-auto">
        <h2 className="display-4 text-center">LOGIN</h2>
          <p className="lead text-center">Sign in to your account</p>
            <Form onSubmit={handleSubmit(this.onSubmit)}>
             {this.renderFields()}
             <div style={{ marginTop: '20px'}}>
              <Button className='loginBtns' variant="primary" size="lg" type="submit" block>
                {loading ? 'Loading...' : 'Login'}
              </Button>
              <Button className='loginBtns' variant="info" size="lg" href="/auth/google" block>
                Sign in with Google
              </Button>
              <Button className='loginBtns' variant="info" size="lg" href="/auth/github" block>
                Sign in with Github
              </Button>
              <p className="mt-3">
              No Account? <Link to="/register"> Register</Link>
              </p>
              </div>
            </Form>
          </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  submitLogin: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

const validate = formValues => {
  const errors = {};

  loginFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

const formWrap = reduxForm({
  validate,
  form: 'loginForm'
})(Login);

export default connect(
  mapStateToProps,
  { submitLogin, clearErrors }
)(formWrap);
