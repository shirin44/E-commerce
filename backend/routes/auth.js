const express = require('express');
const User = require('../controllers/user');
const bcrypt = require('bcrypt');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      // Include user data in the response
      res.status(200).json({
        message: 'Login successful',
        user: { // Add the user data here
          id: user._id,
          username: user.username,
          email: user.email,
          wishlist:user.wishlist,
          cart:user.cart

        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.get('/profile/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      console.log('Fetching profile for user ID:', userId); // Log user ID
  
      // Fetch user details while excluding the password
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with user profile data (excluding password)
      res.status(200).json({
        username: user.username,
        email: user.email,
        shippingAddress: user.shippingAddress || 'No address provided',
        phoneNumber: user.phoneNumber || 'No phone number provided',
      });
  
    } catch (error) {
      console.error('Error fetching profile:', error.message);  // Log the error
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Update user profile
router.put('/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, shippingAddress, phoneNumber } = req.body;

    // Find user and update the profile fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, shippingAddress, phoneNumber },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a product to the user's wishlist
router.post('/wishlist/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find user and update the wishlist
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } }, // Add the product to the wishlist if it's not already there
      { new: true }
    ).populate('wishlist'); // Populate wishlist with product details

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error('Error adding product to wishlist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a product from the user's wishlist
router.delete('/wishlist/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find user and update the wishlist
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } }, // Remove the product from the wishlist
      { new: true }
    ).populate('wishlist'); // Populate wishlist with product details

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error('Error removing product from wishlist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user's wishlist
router.get('/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and populate the wishlist with product details
    const user = await User.findById(userId).populate('wishlist');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a product to the user's cart
router.post('/cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find user and update the cart
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { cart: productId } }, // Add the product to the cart if it's not already there
      { new: true }
    ).populate('cart'); // Populate cart with product details

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    console.error('Error adding product to cart:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a product from the user's cart
router.delete('/cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find user and update the cart
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: productId } }, // Remove the product from the cart
      { new: true }
    ).populate('cart'); // Populate cart with product details

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    console.error('Error removing product from cart:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user's cart
router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and populate the cart with product details
    const user = await User.findById(userId).populate('cart');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  
  

module.exports = router;
