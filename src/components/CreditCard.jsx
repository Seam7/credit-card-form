import React from 'react';
import CreditCardView from './CreditCardView';
import CreditCardForm from './CreditCardForm';

const CreditCard = () => {
  const [state, setState] = React.useState({
    number: '',
    cvv: '',
    holder: '',
    expMonth: '',
    expYear: '',
  });
  const [focused, setFocused] = React.useState('');
  return (
    <div
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CreditCardView state={state} focused={focused} />
      <CreditCardForm
        formState={state}
        setFormState={setState}
        setFocused={setFocused}
      />
    </div>
  );
};

export default CreditCard;
