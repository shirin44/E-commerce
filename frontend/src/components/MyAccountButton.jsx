import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const MyAccountButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/profile')}
      className="flex items-center text-pink-600 hover:text-pink-800"
    >
      <FiUser className="mr-1" />
      My Account
    </button>
  );
};

export default MyAccountButton;
