const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET: /api/buy/all → Return all products
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
});

// ✅ POST: /api/buy/buy → Reduce quantity of a product
router.post('/buy', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qtyToRemove = Number(quantity);

    if (qtyToRemove <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (product.quantity < qtyToRemove) {
      return res.status(400).json({ message: 'Not enough stock.' });
    }

    product.quantity -= qtyToRemove;

    if (product.quantity === 0) {
      await Product.findByIdAndDelete(productId);
      return res.json({ message: `${product.name} is now out of stock and deleted.` });
    } else {
      await product.save();
      return res.json({ message: `You bought ${qtyToRemove} ${product.name}(s).` });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while buying product.' });
  }
});

module.exports = router;
