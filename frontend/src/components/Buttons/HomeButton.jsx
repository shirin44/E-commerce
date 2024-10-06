import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center text-pink-600 hover:text-pink-800"
    >
      <FiHome className="mr-1" />
      Home
    </button>
  );
};

export default HomeButton;
