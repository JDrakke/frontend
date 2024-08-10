const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();


const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

l
router.post('/create-order', async (req, res) => {
  const order = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: order.totalAmount
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error });
  }
});


router.post('/capture-order', async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (error) {
    res.status(500).json({ message: 'Error al capturar la orden', error });
  }
});

module.exports = router;
