import React from "react";
import Searchsection from "./Searchsection";
import MovieList from "./MovieList";
import useDocumentTitle from "./useDocumentTitle";

const Homepage = () => {
  useDocumentTitle("MovieMania");

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
