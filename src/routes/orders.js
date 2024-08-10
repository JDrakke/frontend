const express = require('express');
const Order = require('../models/Order');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
});

module.exports = router;
