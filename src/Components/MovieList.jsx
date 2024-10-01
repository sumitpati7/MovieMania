import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
// require("dotenv").config();

const MovieList = () => {
  const [movie_list, setMovieList] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=" +
        process.env.REACT_APP_API_KEY,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieList(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full py-8">
      <div className="title text-2xl font-semibold text-blue-700 pl-4 pb-2 ">
        All Movies
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movie_list.map((value, index) => {
          console.log(value);

          return <MovieCard className="mx-auto" key={index} movie={value} />;
        })}
      </div>
    </div>
  );
};

export default MovieList;
