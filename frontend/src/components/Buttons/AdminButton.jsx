import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

const AdminButton = ({ isAdmin }) => {
  const navigate = useNavigate();

  if (!isAdmin) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => navigate('/products/add')}
        className="flex items-center px-6 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition"
      >
        <FiPlus className="mr-1" />
        Add Products
      </button>
    </div>
  );
};

export default AdminButton;
