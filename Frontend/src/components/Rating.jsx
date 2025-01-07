import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
const Rating = ( props,{ maxrating=5 }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [rating, setrating] = useState(maxrating);
  useEffect(() => {
    if(props.rating > 0){
      setrating(props.rating);
    }
  }, [])
  
  const handleStarClick = (index) => {
    if (!isRated) {
      setSelectedRating(index + 1);
      setIsRated(true);
    }
  };
  return (
    <div className="rating flex pb-5">
      {[...Array(rating)].map((_, index) => (
        <FaStar
          key={index}
          size={24}
          color={index < selectedRating ? 'yellow' : 'gray'}
          onClick={() => handleStarClick(index)}
          cursor={isRated ? 'default' : 'pointer'} 
          disabled={isRated} 
        />
      ))}
    </div>
  );
};
export default Rating;