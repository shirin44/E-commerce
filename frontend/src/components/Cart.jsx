import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from './Layout/Header'; // Import the Header component

const Cart = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md  mt-24"> {/* Added margin top */}
      <Header /> {/* Include the Header at the top */}
      <h2 className="text-3xl font-bold text-pink-500 mb-6">Shopping Cart</h2>
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
                  onClick={() => removeFromCart(item._id)}
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
