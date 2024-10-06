import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';

const AboutButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/about')}
      className="flex items-center text-pink-600 hover:text-pink-800"
    >
      <FiInfo className="mr-1" />
      About Us
    </button>
  );
};

export default AboutButton;
