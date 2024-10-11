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


// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : '';

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the new rating to the ratings array
    product.ratings.push(rating);

    // Calculate the average rating
    const averageRating = product.ratings.reduce((acc, curr) => acc + curr, 0) / product.ratings.length;

    // Update the average rating field in the product
    product.rating = averageRating;

    await product.save();

    res.status(200).json({ message: 'Rating updated successfully', product });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: error.message });
  }
};
