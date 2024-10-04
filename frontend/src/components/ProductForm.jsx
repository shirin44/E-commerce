import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image); // Append the selected image file
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for form data
        },
      });
      alert(response.data.message);
      // Clear the form fields
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);

      // Navigate to the /products page after successfully adding the product
      navigate('/products'); 
    } catch (error) {
      alert(error.response.data.error || 'Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*" // Allow only image files
          onChange={(e) => setImage(e.target.files[0])} // Get the selected file
          required
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Product
      </button>
      <button
        type="button" // Use type="button" to prevent form submission
        onClick={() => navigate('/products')} // Navigate to /products
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Go to Products
      </button>
    </form>
  );
};

export default ProductForm;
