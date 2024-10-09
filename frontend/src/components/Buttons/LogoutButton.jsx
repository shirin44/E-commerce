import React from 'react';
import { FiLogOut } from 'react-icons/fi'; // Import logout icon
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center text-pink-600 hover:text-pink-800"
    >
      <FiLogOut className="mr-1" /> {/* Logout icon */}
      Logout
    </button>
  );
};

export default Logout;
