const express = require('express');
const multer = require('multer');
const path = require('path');
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const Product = require('../models/Product'); // Ensure this import is present

const router = express.Router();

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
  },
});

const upload = multer({ storage });

// Product routes
router.post('/', upload.single('image'), addProduct); // Route for adding product with image
router.get('/', getAllProducts); // Route for retrieving all products
router.put('/:id', upload.single('image'), updateProduct); // Route to update a product
router.delete('/:id', deleteProduct); // Route to delete a product
// Get a product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id); // Ensure Product is referenced here
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  });
  
  
module.exports = router;
