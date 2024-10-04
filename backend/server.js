const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Ensure this file exists and exports routes
const productRoutes = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images) from the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/E-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.get('/api/test', (req, res) => {
  res.send('API is working!');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
