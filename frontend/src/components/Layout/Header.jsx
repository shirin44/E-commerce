import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiHome, FiUser, FiShoppingCart, FiSearch, FiInfo } from 'react-icons/fi';
import blossomLogo from '../Images/blossom-logo.jpg';
import HomeButton from '../Buttons/HomeButton';
import AboutButton from '../Buttons/AboutButton'; // Ensure you import this
import Logout from '../Buttons/LogoutButton';
import CartButton from '../Buttons/CartButton'; // Ensure you import this

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleSearchChange = (e) => {
    onSearch(e.target.value); // Call the onSearch function with the input value
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-pink-200 shadow-md p-4 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <img src={blossomLogo} alt="Blossom Touch Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold text-pink-700 ml-2">Blossom Touch</h1>
        </div>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search products"
            className="px-4 py-2 rounded-full border border-pink-400 focus:outline-none focus:border-pink-600 transition w-full"
            onChange={handleSearchChange} // Update search query on input change
          />
          <FiSearch className="absolute top-2 right-3 text-pink-600" />
        </div>
        <div className="flex space-x-6">
          <HomeButton />
          <AboutButton />
          <Logout />
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
