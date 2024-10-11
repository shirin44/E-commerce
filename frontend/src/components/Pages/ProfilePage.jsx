import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';
import Header from '../Layout/Header';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    email: '',
    shippingAddress: '',
    phoneNumber: ''
  });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/profile/${id}`);
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage('');
    try {
      await axios.put(`http://localhost:5000/api/auth/profile/${id}`, user);
      setIsSaving(false);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setIsSaving(false);
      setError('Error updating profile');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <>
      <Header /> {/* Display the Header at the top */}
      <div className="max-w-xl mx-auto mt-24 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">User Profile</h1>

        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            {successMessage}
          </div>
        )}

        {isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-pink-300 focus:border-pink-500"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-pink-300 focus:border-pink-500"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Shipping Address</label>
              <input
                type="text"
                name="shippingAddress"
                value={user.shippingAddress}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-pink-300 focus:border-pink-500"
                placeholder="Enter shipping address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-pink-300 focus:border-pink-500"
                placeholder="Enter phone number"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full font-semibold transition"
              >
                <FiX className="mr-1" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-semibold transition ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSaving}
              >
                <FiSave className="mr-1" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              <strong className="block text-gray-700 font-medium">Username:</strong> {user.username}
            </p>
            <p>
              <strong className="block text-gray-700 font-medium">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="block text-gray-700 font-medium">Shipping Address:</strong> {user.shippingAddress || 'No address provided'}
            </p>
            <p>
              <strong className="block text-gray-700 font-medium">Phone Number:</strong> {user.phoneNumber || 'No phone number provided'}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-semibold transition"
              >
                <FiEdit className="mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
