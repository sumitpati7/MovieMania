import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      {stars.map((value, index) => (
        <FontAwesomeIcon
          className="text-[8px] text-black"
          style={{ color: index + 1 < rating ? "orange" : "black" }}
          key={index}
          icon={faStar}
        />
      ))}
    </>
  );
};

export default StarRating;
