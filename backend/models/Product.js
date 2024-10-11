const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ratings: { type: [Number], default: [] }, // Array to store all ratings
  rating: { type: Number, default: 0 } // To store the average rating
});


module.exports = mongoose.model('Product', productSchema);
