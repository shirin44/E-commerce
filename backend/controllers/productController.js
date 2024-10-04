const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : ''; // Get the uploaded image path

  try {
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Construct the full image URL for each product
    const productsWithImages = products.map(product => ({
      ...product.toObject(),
      image: `${req.protocol}://${req.get('host')}/${product.image}` // Create the full URL
    }));
    res.status(200).json(productsWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
