import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
// require("dotenv").config();

const MovieList = () => {
  const filter_type = [
    {
      title: "Now Playing",
      url_snip: "now_playing",
    },
    {
      title: "Popular",
      url_snip: "popular",
    },
    {
      title: "Top Rated",
      url_snip: "top_rated",
    },
    {
      title: "Upcoming",
      url_snip: "upcoming",
    },
  ];
  const [movie_list, setMovieList] = useState([]);
  const [filter, setFilter] = useState("now_playing");

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

  const fetchData = (filter) => {
    setFilter(filter);
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        filter +
        "?language=en-US&page=1&api_key=" +
        process.env.REACT_APP_API_KEY,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieList(response.results))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full py-8">
      <div className="title text-2xl font-semibold text-blue-700 pl-4 pb-2 ">
        <select
          name="filter"
          id="filter"
          value={filter}
          onChange={(e) => {
            fetchData(e.target.value);
          }}
        >
          {filter_type.map((value, index) => (
            <option key={index} value={value.url_snip}>
              {value.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movie_list.map((value, index) => (
          <MovieCard className="mx-auto" key={index} movie={value} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
