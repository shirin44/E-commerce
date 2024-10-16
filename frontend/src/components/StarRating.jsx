import React from "react";

const StarRating = ({ rating, onRatingChange, productId }) => {
  const handleRatingClick = (newRating) => {
    onRatingChange(productId, newRating);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingClick(star)}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
