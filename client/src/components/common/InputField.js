import React from "react";
import { FormControl, FormGroup, Col } from "react-bootstrap";
import propTypes from "prop-types";


const InputField = ({ type, name, value, error, placeholder, onChange }) => {
  const style = {
    invalidLabel: {
      color: "red"
    },
    invalidInfo: {
      color: "red",
      fontSize: "1.5em"
    },
    invalid: {
      border: "1px solid red"
    },
    valid: {}
  };

  return (
    <FormGroup>
      <Col sm={2} style={{ fontSize: 27 }}>
        <span style={error && style.invalidLabel}>{name + " : "}</span>
      </Col>

      <Col sm={10}>
        <FormControl
          className="input"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          style={error && style.invalid}
          onChange={onChange}
        />
        {error && <span style={style.invalidInfo}>{error}</span>}
      </Col>
    </FormGroup>
  );
};

InputField.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

InputField.defaultProps = {
  type: "text"
};

export default InputField;