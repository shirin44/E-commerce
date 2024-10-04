import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList'; // Ensure the ProductList component is imported
import Cart from './Cart'; // Ensure the Cart component is imported

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p className="text-lg mb-6">Welcome, {user.username}! This is your dashboard.</p>

      <div className="flex justify-between w-full max-w-4xl mb-8">
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
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
        </button>
      </div>

      {/* Display Product List */}
      <div className="w-full max-w-4xl mb-8">
        <ProductList />
      </div>



      {/* Show Add Products if user is admin */}
      {user.username === 'admin' && (
        <div>
          <button
            onClick={() => navigate('/products/add')} // Navigate to add product page
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
