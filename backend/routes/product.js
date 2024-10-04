const express = require('express');
const multer = require('multer'); // Import multer
const path = require('path'); // Import path
const { addProduct, getAllProducts } = require('../controllers/productController');

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

module.exports = router;
