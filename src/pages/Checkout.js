import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import './Checkout.css';

const initialOptions = {
  clientId: 'AX8aNh45AJwewicBG5ga995oewuZBdslDaHzT5f02YzyYMnL8q5q9tN5bRms_Gw1DxtSupa987l_jOLh',
  currency: 'USD'
};

const Checkout = () => {
  const handleApprove = (orderId) => {
    
    console.log('Order approved:', orderId);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">Complete your purchase securely with PayPal</p>
      </div>
      <div className="checkout-body">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons 
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: '0.01' 
                  }
                }]
              });
            }}
            onApprove={async (data, actions) => {
              await actions.order.capture();
              handleApprove(data.orderID);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Checkout;
