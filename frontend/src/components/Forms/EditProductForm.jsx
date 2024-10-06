import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(''); // New state to hold the image URL

  // Fetch the product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const { name, description, price, image } = response.data;
        setName(name);
        setDescription(description);
        setPrice(price);
        setCurrentImage(image); // Set the current image URL
      } catch (error) {
        alert('Failed to load product');
        console.error('Error fetching product:', error); // Log the error for debugging
      }
    };
  
    fetchProduct();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully');
      navigate(-1);
    } catch (error) {
      alert('Failed to update product');
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />
          {/* Optionally display the current image */}
          {currentImage && !image && (
            <img src={currentImage} alt="Current product" className="w-24 h-24 object-cover mb-2 rounded border" />
          )}
          {image && <img src={URL.createObjectURL(image)} alt="New product" className="w-24 h-24 object-cover mb-2 rounded border" />}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
