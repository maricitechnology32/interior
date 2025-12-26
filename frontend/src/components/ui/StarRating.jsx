import React from 'react';

// This component will display 5 stars, coloring them based on the rating
const StarRating = ({ rating }) => {
  // Create an array [1, 2, 3, 4, 5]
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex">
      {stars.map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${rating >= star ? 'text-[#D1B68A]' : 'text-gray-300'
            }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.83 5.626a1 1 0 00.95.69h5.908c.969 0 1.371 1.24.588 1.81l-4.78 3.47a1 1 0 00-.364 1.118l1.83 5.626c.3.921-.755 1.688-1.54 1.118l-4.78-3.47a1 1 0 00-1.175 0l-4.78 3.47c-.784.57-1.838-.197-1.54-1.118l1.83-5.626a1 1 0 00-.364-1.118L.588 11.053c-.783-.57-.38-1.81.588-1.81h5.908a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;