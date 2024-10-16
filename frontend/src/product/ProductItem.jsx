import React from "react";
import StarRating from "../components/StarRating";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

const ProductItem = ({
  product,
  isInWishlist,
  isInCart,
  onAddToCart,
  onRemoveFromCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-4 h-200 flex flex-col justify-between">
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <StarRating
        rating={product.rating}
        onRatingChange={onRatingChange}
        productId={product._id}
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
      <div className="flex justify-between mt-4">
        {isInCart(product._id) ? (
          <PiShoppingCartSimpleFill
            onClick={() => onRemoveFromCart(product._id)}
            className="text-blue-500 cursor-pointer text-2xl"
          />
        ) : (
          <AiOutlineShoppingCart
            onClick={() => onAddToCart(product._id)}
            className="text-blue-500 cursor-pointer text-2xl"
          />
        )}
        {isInWishlist(product._id) ? (
          <FaHeart
            onClick={() => onRemoveFromWishlist(product._id)}
            className="text-red-500 cursor-pointer text-2xl"
          />
        ) : (
          <FaRegHeart
            onClick={() => onAddToWishlist(product._id)}
            className="text-gray-400 cursor-pointer text-2xl"
          />
        )}
      </div>
      {isAdmin && (
        <div className="mt-4 flex justify-between">
          <button onClick={() => onEdit(product._id)} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">Edit</button>
          <button onClick={() => onDelete(product._id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
