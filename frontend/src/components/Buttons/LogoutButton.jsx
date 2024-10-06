import React from 'react';
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
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default Logout;
