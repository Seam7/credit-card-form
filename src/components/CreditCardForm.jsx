import React from 'react';
import CCInput from './CCInput';
import './CreditCardForm.css';

const CreditCardForm = ({ formState, setFormState, setFocused }) => {
  const setFieldState = (field, value) => {
    setFormState(() => ({ ...formState, [field]: value || '' }));
  };

  const handleFieldChange = (e) => {
    switch (e.target.name) {
      case 'cc-number': {
        const newValue = e.target.value.replace(/\D/g, '');
        setFieldState('number', newValue);
        break;
      }
      case 'cc-cvv': {
        const newValue = e.target.value.replace(/\D/g, '');
        setFieldState('cvv', newValue);
        break;
      }
      case 'cc-holder': {
        setFieldState('holder', e.target.value);
        break;
      }
      case 'cc-expiration': {
        setFieldState('expiration', e.target.value);
        break;
      }
      case 'cc-exp-month': {
        setFieldState('expMonth', e.target.value);
        break;
      }
      case 'cc-exp-year': {
        setFieldState('expYear', e.target.value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="credit-card-form">
      <div className="credit-card-form__number">
        <CCInput
          name="cc-number"
          label="Credit card number"
          value={formState.number}
          onChange={handleFieldChange}
          options={{ maxLength: 16 }}
          onFocus={setFocused}
        />
      </div>
      <div className="credit-card-form__holder">
        <CCInput
          name="cc-holder"
          label="Card holder"
          value={formState.holder}
          onChange={handleFieldChange}
          onFocus={setFocused}
        />
      </div>
      <div className="credit-card-form__row">
        <div className="credit-card-form__exp-month">
          <CCInput
            name="cc-exp-month"
            label="Month"
            value={formState.expMonth}
            onChange={handleFieldChange}
            options={{ maxLength: 2 }}
            onFocus={setFocused}
          />
        </div>
        <div className="credit-card-form__exp-year">
          <CCInput
            name="cc-exp-year"
            label="Year"
            value={formState.expYear}
            onChange={handleFieldChange}
            options={{ maxLength: 2 }}
            onFocus={setFocused}
          />
        </div>
        <div className="credit-card-form__cvv">
          <CCInput
            name="cc-cvv"
            label="CVV"
            value={formState.cvv}
            onChange={handleFieldChange}
            options={{ maxLength: 4 }}
            onFocus={setFocused}
          />
        </div>
      </div>
      <div className="credit-card-form__submit">
        <div className="credit-card-form-submit__progress-bar">0%</div>
        <button className="credit-card-form-submit__button">Submit</button>
      </div>
    </div>
  );
};

export default CreditCardForm;
