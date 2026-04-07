const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getOrder, updateStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, admin, updateStatus);

module.exports = router;
