import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StarRating from "../Stars";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [wishlist, setWishlist] = useState([]); // State to store user's wishlist

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
      try {
        if (user) {
          const response = await axios.get(`http://localhost:5000/api/users/wishlist/${user.id}`);
          setWishlist(response.data.wishlist);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchProducts();
    fetchWishlist(); // Fetch wishlist when component mounts
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

  const handleRatingChange = async (newRating) => {
    if (selectedProduct) {
      try {
        await axios.put(
          `http://localhost:5000/api/products/rating/${selectedProduct._id}`,
          { rating: newRating }
        );
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id
              ? {
                  ...product,
                  ratings: [...product.ratings, newRating],
                  rating: (
                    [...product.ratings, newRating].reduce((a, b) => a + b, 0) /
                    (product.ratings.length + 1)
                  ).toFixed(1),
                }
              : product
          )
        );
        alert("Rating updated successfully");
      } catch (error) {
        alert("Failed to update rating");
      }
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/wishlist/${user.id}/${productId}`
      );
      setWishlist((prevWishlist) => [...prevWishlist, productId]);
      alert("Product added to wishlist");
    } catch (error) {
      alert("Failed to add product to wishlist: " + error.message);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/wishlist/${user.id}/${productId}`
      );
      setWishlist((prevWishlist) =>
        prevWishlist.filter((id) => id !== productId)
      );
      alert("Product removed from wishlist");
    } catch (error) {
      alert("Failed to remove product from wishlist: " + error.message);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // Filter and sort products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      {/* Sort dropdown */}
      <div className="flex justify-end mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by Price:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-xl rounded-lg p-4 h-200 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <StarRating
                rating={product.rating}
                onRatingChange={handleRatingChange}
              />
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-lg">Price: ${product.price.toFixed(2)}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="mt-4 mb-4 rounded-lg object-cover h-32 w-full"
                />
              )}
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Add to Cart
              </button>

              {/* Wishlist heart icon */}
              {isInWishlist(product._id) ? (
                <FaHeart
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="text-red-500 cursor-pointer text-2xl mt-2"
                />
              ) : (
                <FaRegHeart
                  onClick={() => handleAddToWishlist(product._id)}
                  className="text-gray-400 cursor-pointer text-2xl mt-2"
                />
              )}

              {/* Admin Edit/Delete */}
              {user && user.username === "admin" && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
