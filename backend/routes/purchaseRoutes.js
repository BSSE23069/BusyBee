const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/buy', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient product quantity.' });
    }

    product.quantity -= quantity;
    await product.save();

    res.json({ message: `You bought ${quantity} ${product.name}(s) successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Server error while purchasing product.' });
  }
});

module.exports = router;
