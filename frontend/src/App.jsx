import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard'; // Create this component next
import { useAuth } from './context/AuthContext';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css'
import EditProductForm from './components/EditProductForm';
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
