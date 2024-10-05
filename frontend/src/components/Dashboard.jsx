import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import blossomLogo from './blossom-logo.jpg'; // Use the shop's logo

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    return activeTab === 'products' ? <ProductList /> : <Cart />;
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800">
      {/* Header Section - Sticky when scrolling */}
      <header className="fixed top-0 left-0 right-0 bg-pink-100 shadow-md p-4 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={blossomLogo}
              alt="Blossom Touch Logo"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-pink-600 ml-2 ">Blossom Touch</h1>
          </div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products"
            className="px-4 py-2 rounded-full border focus:outline-none focus:border-pink-400 transition w-1/3"
          />
          <div className="flex space-x-6">
            {/* Navigation */}
            <button onClick={() => navigate('/')} className="text-pink-600 hover:underline">
              Home
            </button>
            <button onClick={() => navigate('/about')} className="text-pink-600 hover:underline">
              About Us
            </button>
            <button onClick={() => navigate('/profile')} className="text-pink-600 hover:underline">
              My Account
            </button>
            {/* Cart */}
            <button onClick={() => navigate('/cart')} className="relative text-pink-600 hover:underline">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white rounded-full text-xs px-1">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content with padding to avoid overlap with sticky header */}
      <div className="pt-24 max-w-6xl mx-auto p-4">
        {/* Tabs Section */}
        <div className="my-6 flex justify-center space-x-4">
          {['products', 'cart'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === tab ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="w-full">{renderContent()}</div>

        {/* Admin Add Products Button */}
        {user.username === 'admin' && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/products/add')}
              className="px-6 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Add Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
