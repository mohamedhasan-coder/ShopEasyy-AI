const Order = require('../models/Order');
const Razorpay = require('razorpay');
require('dotenv').config();

const razor = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

const createOrder = async (req, res) => {
  // create razorpay order and save minimal order record
  const { items, totalPrice, shippingAddress } = req.body;
  const amount = Math.round(totalPrice * 100); // paise
  const options = { amount, currency: 'INR' };
  const rOrder = await razor.orders.create(options);
  const order = await Order.create({ user: req.user._id, items, shippingAddress, totalPrice, paymentInfo: { razorpay_order_id: rOrder.id } });
  res.json({ razorpayOrder: rOrder, order });
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  // Simple verification
  const crypto = require('crypto');
  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
  if (generated_signature === razorpay_signature) {
    const order = await Order.findById(orderId);
    order.paymentInfo = { razorpay_order_id, razorpay_payment_id, razorpay_signature };
    order.status = 'processing';
    await order.save();
    // emit socket update
    const io = req.app.locals.io;
    io.to(order._id.toString()).emit('orderUpdate', { status: order.status });
    res.json({ success: true, order });
  } else {
    res.status(400).json({ success: false });
  }
};

const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
};

const updateStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  order.status = req.body.status;
  await order.save();
  req.app.locals.io.to(order._id.toString()).emit('orderUpdate', { status: order.status });
  res.json(order);
};

module.exports = { createOrder, verifyPayment, getOrder, updateStatus };
