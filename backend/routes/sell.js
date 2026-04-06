const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Sell product - increase stock
router.post('/sell', async (req, res) => {
   try {
     const { name, category, price, quantity, description } = req.body;
 
     // Validate required fields
     if (!name || !category || price == null || quantity == null) {
       return res.status(400).json({ message: 'Please provide all required fields.' });
     }
 
     const product = new Product({ name, category, price, quantity, description });
     await product.save();
 
     res.status(201).json({ message: 'Product added successfully.' });
   } catch (error) {
     console.error('Error in /api/products/add:', error);
     res.status(500).json({ message: 'Server error while adding product.' });
   }
});

module.exports = router;
