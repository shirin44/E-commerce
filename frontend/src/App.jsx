import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Forms/register';
import Login from './components/Forms/login';
import Logout from './components/Buttons/LogoutButton'; // Updated for consistency
import Dashboard from './components/Dashboard/Dashboard';
import { useAuth } from './context/AuthContext';
import ProductForm from './components/Forms/ProductForm';
import ProductList from './components/Dashboard/ProductList';
import Cart from './components/Cart'; // Assuming this hasn't been moved
import './App.css';
import AboutUs from './components/pages/AboutUs';
import EditProductForm from './components/Forms/EditProductForm';
import ProfilePage from './components/Pages/ProfilePage';
const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/edit-product/:id" element={<EditProductForm />} /> 
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/profile/:id" element={<ProfilePage />} /> 
      
        </Routes>
      </div>
    </Router>
  );
};

export default App;
