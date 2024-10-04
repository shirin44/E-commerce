import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
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
          <div className="mt-4 flex justify-between">
            <button
              onClick={clearCart}
              className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
            >
              Clear Cart
            </button>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
