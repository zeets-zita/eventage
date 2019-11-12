import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from '../common/FormField';
import { submitRegister, clearErrors } from '../../actions/authActions';
import { Form, Row, Col, Button } from 'reactstrap';


const registerFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password' },
  { label: 'Confirm Password', name: 'password2' }
];

class Register extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderFields() {
    return registerFields.map(({ label, name }) => {
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
    const { submitRegister, history } = this.props;
    submitRegister(formValues, history);
  };

  render() {
    const {
      handleSubmit,
      auth: { errors }
    } = this.props;

  return (
    <Row className="register" style={{ marginTop: '20px'}}>
      <Col md={5} className="m-auto">
        <h2 className="display-4 text-center">Register</h2>
        <Form onSubmit={handleSubmit(this.onSubmit)} style={{ padding: '10px'}}>
          {this.renderFields()}
          <Button type="submit" size="lg" block 
          style={{ backgroundColor: 'rgb(199, 190, 165)', border: 'none'}}>Register</Button>
          {errors.register && errors.register}
        </Form>
        </Col>
      </Row>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  submitRegister: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

const validate = formValues => {
  const errors = {};

  registerFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  const { password, password2 } = formValues;
  if (password !== password2) {
    errors.password2 = 'Passwords do not match';
  }

  return errors;
};

const formWrap = reduxForm({
  validate,
  form: 'registerForm'
})(Register);

export default connect(
  mapStateToProps,
  { submitRegister, clearErrors }
)(formWrap);
