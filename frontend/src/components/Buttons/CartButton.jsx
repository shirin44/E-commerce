import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="relative flex items-center text-pink-600 hover:text-pink-800"
    >
      <FiShoppingCart className="mr-1" />
      Cart
      {cartItems.length > 0 && (
        <span className="absolute top-0 right-0 bg-pink-500 text-white rounded-full text-xs px-1">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default CartButton;
