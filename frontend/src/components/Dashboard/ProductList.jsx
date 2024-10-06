import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); // Navigate to edit form
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id)); // Remove from UI
      alert('Product deleted successfully');
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-lg">Price: ${product.price.toFixed(2)}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="mt-4 mb-4 rounded-lg object-cover h-48 w-full"
                />
              )}
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Add to Cart
              </button>

              {/* Render Edit and Delete buttons if the user is admin */}
              {user && user.username === 'admin' && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
