import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import './PayPalButton.css'; 

const PayPalButton = ({ amount }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount, 
          },
        },
      ],
    });
  };

  const handleApprove = async (data, actions) => {
    setLoading(true);
    try {
      await actions.order.capture();
      alert('Transaction completed by ' + data.payer.name.given_name);
    } catch (err) {
      setError('Transaction failed. Please try again.');
      console.error('PayPal transaction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paypal-button-container">
      {loading && <p className="loading-message">Processing...</p>}
      {error && <p className="error-message">{error}</p>}
      <PayPalButtons
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={(err) => setError('An error occurred. Please try again.')}
      />
    </div>
  );
};

export default PayPalButton;

