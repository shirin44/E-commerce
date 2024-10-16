import React from 'react';

const StarRating = ({ rating, onRatingChange, productId }) => {
  const stars = [...Array(5)].map((_, index) => {
    const starRating = index + 1;
    return (
      <span 
        key={starRating}
        className={`cursor-pointer ${starRating <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        onClick={() => onRatingChange(starRating, productId)} // Pass starRating and productId
      >
        ★
      </span>
    );
  });

  return <div>{stars}</div>;
};

export default StarRating;
