import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      alert(response.data.message);
      // Call the login function to update the auth state
      login(response.data.user); // Ensure you send user data from your backend
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.response.data.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-bold rounded ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-200`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
