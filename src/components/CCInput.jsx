import React from 'react';
import './CCInput.css';

const CCInput = ({ label, value, onChange, options, onFocus, name }) => (
  <div className="cc-input">
    <label className="cc-input__label">{label}</label>
    <div className="cc-input__shadow" />
    <input
      className="cc-input__input"
      name={name}
      onChange={onChange}
      value={value}
      onFocus={() => onFocus(name)}
      {...options}
    />
  </div>
);

export default CCInput;
