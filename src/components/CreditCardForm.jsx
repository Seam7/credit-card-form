import React, { useState } from 'react';
import CCInput from './CCInput';
import CCProgressBar from './CCProgressBar';
import './CreditCardForm.css';

const CreditCardForm = ({ formState, setFormState, setFocused }) => {
  const [percentageCompleted, setPercentageCompleted] = useState({
    number: 0,
    cvv: 0,
    holder: 0,
    expMonth: 0,
    expYear: 0,
  });

  const changeField = (field, value) => {
    setFormState(() => ({ ...formState, [field]: value || '' }));
  };

  const changePercetageCompleted = (field, fieldPercentageCompleted) => {
    setPercentageCompleted({
      ...percentageCompleted,
      [field]: fieldPercentageCompleted,
    });
  };

  const MAX_CHARACTERS = {
    number: 16,
    cvv: 3,
    holder: 100,
    expMonth: 2,
    expYear: 2,
  };

  const formPercentage = Math.round(
    Object.values(percentageCompleted).reduce(
      (acc, percentage) => acc + percentage
    ) / 5
  );

  const handleFieldChange = (e) => {
    switch (e.target.name) {
      case 'cc-number': {
        const newValue = e.target.value.replace(/\D/g, '');
        changeField('number', newValue);
        const fieldPercentageCompleted =
          (newValue.length / MAX_CHARACTERS.number) * 100;
        changePercetageCompleted('number', fieldPercentageCompleted);
        break;
      }
      case 'cc-cvv': {
        const newValue = e.target.value.replace(/\D/g, '');
        const fieldPercentageCompleted =
          (newValue.length / MAX_CHARACTERS.cvv) * 100;
        changePercetageCompleted('cvv', fieldPercentageCompleted);
        changeField('cvv', newValue);
        break;
      }
      case 'cc-holder': {
        changeField('holder', e.target.value);
        const fieldPercentageCompleted = e.target.value === '' ? 0 : 100;
        changePercetageCompleted('holder', fieldPercentageCompleted);
        break;
      }
      case 'cc-exp-month': {
        changeField('expMonth', e.target.value);
        const fieldPercentageCompleted =
          (e.target.value.length / MAX_CHARACTERS.expMonth) * 100;
        changePercetageCompleted('expMonth', fieldPercentageCompleted);
        break;
      }
      case 'cc-exp-year': {
        changeField('expYear', e.target.value);
        const fieldPercentageCompleted =
          (e.target.value.length / MAX_CHARACTERS.expYear) * 100;
        changePercetageCompleted('expYear', fieldPercentageCompleted);
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
            options={{ maxLength: 3 }}
            onFocus={setFocused}
          />
        </div>
      </div>
      <div className="credit-card-form__submit">
        <CCProgressBar percentage={formPercentage} />
        <button className="credit-card-form-submit__button">Submit</button>
      </div>
    </div>
  );
};

export default CreditCardForm;
