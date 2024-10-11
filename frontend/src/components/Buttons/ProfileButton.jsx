// src/components/Buttons/ProfileButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext'; // Assume this provides user info

const ProfileButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user data from context

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`); // Navigate to profile page with user ID
  };

  return (
    <button onClick={handleProfileClick} className="flex items-center space-x-2">
      <FiUser className="text-pink-600" />
      <span className="text-pink-600 font-semibold">Profile</span>
    </button>
  );
};

export default ProfileButton;
