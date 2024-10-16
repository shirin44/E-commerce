import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from './Layout/Header'; // Import the Header component
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from AuthContext
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Optional feedback message

  // Fetch the cart items from the server when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user) {
          const response = await axios.get(`http://localhost:5000/api/auth/cart/${user.id}`);
          setCartItems(response.data.cart); // Fetch the cart items from backend
          setLoading(false); // Stop loading after fetching data
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };
    
    fetchCartItems();
  }, [user]);

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Remove a product from the cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/cart/${user.id}/${productId}`);
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== productId)); // Update the cart items after removing
      setFeedbackMessage("Product removed from cart");
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear feedback message after 3 seconds
    } catch (error) {
      alert("Failed to remove product from cart: " + error.message);
    }
  };

  // Clear the cart
  const clearCart = async () => {
    try {
      // Call handleRemoveFromCart for each item in the cart
      for (const item of cartItems) {
        await handleRemoveFromCart(item._id);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-24">
      <Header /> {/* Include the Header at the top */}
      <h2 className="text-3xl font-bold text-pink-500 mb-6">Shopping Cart</h2>
      {feedbackMessage && <p className="text-green-500">{feedbackMessage}</p>} {/* Optional feedback message */}
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold text-pink-500">Total: ${totalPrice}</p>
            <div>
              <button
                onClick={clearCart}
                className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition duration-200"
              >
                Clear Cart
              </button>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ml-2"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Cart;
