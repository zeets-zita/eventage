import React from 'react';
import { Label, Input } from 'reactstrap';


export default ({
  input,
  type,
  label,
  placeholder,
  meta: { error, touched }
}) => {
  return (
    <div>
      <Label >{label}: </Label > 
      <br/>
      <Input style={{marginBottom: '10px'}}
      type={type} placeholder={placeholder} {...input} />
      <div>{touched && error}</div>
    </div>
  );
};
