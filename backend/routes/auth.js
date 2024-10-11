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

  
  

module.exports = router;
