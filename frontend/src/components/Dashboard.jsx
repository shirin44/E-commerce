import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import blossomLogo from './blossom-logo.jpg'; // Import the logo

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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center w-full max-w-4xl mb-6">
        {/* Logo Placeholder */}
        <div className="flex items-center">
          <img
            src={blossomLogo} // Use the imported logo
            alt="Blossom Touch Logo"
            className="h-10"
          />
          <h1 className="text-3xl font-bold ml-2">Blossom Touch</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>

          <div className="relative">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h18l-2 9H5L3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 20h12a2 2 0 002-2H4a2 2 0 002 2z"
                />
              </svg>
              Cart
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs font-bold px-1">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Profile Icon */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center justify-center bg-gray-300 rounded-full w-10 h-10 hover:bg-gray-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 22c-4.418 0-8-3.582-8-8h16c0 4.418-3.582 8-8 8z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Tabs for Navigation */}
      <div className="flex space-x-4 mb-6">
        {['products', 'cart'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded transition ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} {/* Capitalize tab names */}
          </button>
        ))}
      </div>

      {/* Render the content based on active tab */}
      <div className="w-full max-w-4xl mb-8">
        {renderContent()}
      </div>

      {/* Show Add Products button if user is admin */}
      {user.username === 'admin' && (
        <button
          onClick={() => navigate('/products/add')}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Add Products
        </button>
      )}
    </div>
  );
};

export default Dashboard;
