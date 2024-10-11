import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StarRating from "../Stars";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

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
        // Update the ratings array on the backend
        await axios.put(
          `http://localhost:5000/api/products/rating/${selectedProduct._id}`,
          { rating: newRating }
        );

        // Update the local state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id
              ? {
                  ...product,
                  ratings: [...product.ratings, newRating], // Add the new rating to the array
                  // Calculate new average rating
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

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered products based on the selected sort order
  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortOrder === "asc"
      ? a.price - b.price // Ascending order
      : b.price - a.price; // Descending order
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

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
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <StarRating
                rating={product.rating} // Use product's average rating
                onRatingChange={handleRatingChange}
              />

              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-lg">
                Price: ${product.price.toFixed(2)}
              </p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="mt-4 mb-4 rounded-lg object-cover h-32 w-full"
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Add to Cart
              </button>

              {/* Render Edit and Delete buttons if the user is admin */}
              {user && user.username === "admin" && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(product._id);
                    }}
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product._id);
                    }}
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

      {/* Popup Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
            <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
            <StarRating
              rating={selectedProduct.rating} // Show selected product's rating
              onRatingChange={(newRating) => handleRatingChange(newRating)} // Allow rating in modal
            />
            <p className="mt-2 text-gray-600">{selectedProduct.description}</p>
            <p className="font-bold text-lg mt-4">
              Price: ${selectedProduct.price.toFixed(2)}
            </p>
            {selectedProduct.image && (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="mt-4 mb-4 rounded-lg object-cover h-48 w-full"
              />
            )}
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
