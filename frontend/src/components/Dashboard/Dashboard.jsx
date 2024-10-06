import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import MainContent from '../Layout/MainContent';
import ProductList from '../Dashboard/ProductList';
import AdminButton from '../Buttons/AdminButton'
const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800">
      {/* Header Section */}
      <Header onSearch={handleSearch} />

      {/* Main content with padding to avoid overlap with sticky header */}
      <div className="pt-24 max-w-6xl mx-auto p-4">
        {/* Always show Product List */}
        <ProductList searchQuery={searchQuery} />

        {/* Admin Add Products Button */}
        <AdminButton isAdmin={user.username === 'admin'} />
      </div>
    </div>
  );
};

export default Dashboard;
