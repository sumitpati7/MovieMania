import React from "react";
import Searchsection from "./Searchsection";
import MovieList from "./MovieList";

const Homepage = () => {
  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto">
        <Searchsection />
        <MovieList />
      </div>
    </div>
  );
};

export default Homepage;
