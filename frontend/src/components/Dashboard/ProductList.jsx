import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import SortDropdown from "../../product/SortDropdown";
import FeedbackMessage from "../../product/FeedbackMessage";
import ProductItem from "../../product/ProductItem";
const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sortOrder, setSortOrder] = useState("asc");
  const [wishlist, setWishlist] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/wishlist/${user.id}`);
          setWishlist(response.data.wishlist.map((item) => item._id));
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      }
    };

    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/cart/${user.id}`);
          setCartItems(response.data.cart.map((item) => item._id));
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      }
    };

    fetchProducts();
    fetchWishlist();
    fetchCartItems();
  }, [user]);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully");
      } catch (error) {
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(`http://localhost:5000/api/auth/wishlist/${user.id}/${productId}`);
      setWishlist((prevWishlist) => [...prevWishlist, productId]);
    } catch (error) {
      alert("Failed to add product to wishlist: " + error.message);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/wishlist/${user.id}/${productId}`);
      setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
    } catch (error) {
      alert("Failed to remove product from wishlist: " + error.message);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`http://localhost:5000/api/auth/cart/${user.id}/${productId}`);
      setCartItems((prevCartItems) => [...prevCartItems, productId]);
      setFeedbackMessage("Product added to cart");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (error) {
      alert("Failed to add product to cart: " + error.message);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/cart/${user.id}/${productId}`);
      setCartItems((prevCartItems) => prevCartItems.filter((id) => id !== productId));
      setFeedbackMessage("Product removed from cart");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (error) {
      alert("Failed to remove product from cart: " + error.message);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />

      <FeedbackMessage message={feedbackMessage} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            isInWishlist={(id) => wishlist.includes(id)}
            isInCart={(id) => cartItems.includes(id)}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={user && user.role === "admin"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
