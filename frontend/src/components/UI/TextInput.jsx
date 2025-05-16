import React from 'react';
import './TextInput.scss';

export const TextInput = (props) => (
  <input type="text" className="form-control text-input" {...props} />
);