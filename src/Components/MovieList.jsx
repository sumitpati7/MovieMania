import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectMovies } from "../redux/movieSlice";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const filter_type = [
  { title: "Now Playing", url_snip: "now_playing" },
  { title: "Popular", url_snip: "popular" },
  { title: "Top Rated", url_snip: "top_rated" },
  { title: "Upcoming", url_snip: "upcoming" },
];

const MovieList = () => {
  const [filter, setFilter] = useState("now_playing");
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchData = useCallback(
    async (category) => {
      if (!apiKey) {
        console.error("API key is missing. Check your .env file.");
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&api_key=${apiKey}`,
          options,
        );
        const data = await res.json();
        dispatch(fetchMovies(data.results || []));
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    },
    [dispatch, apiKey],
  );

  useEffect(() => {
    fetchData(filter);
  }, [filter, fetchData]);

  return (
    <div className="w-full py-8">
      <div className="title text-2xl font-semibold text-blue-700 pl-4 pb-2 ">
        <select
          name="filter"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {filter_type.map((value, index) => (
            <option key={index} value={value.url_snip}>
              {value.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {movies.map((movie, index) => (
          <MovieCard className="mx-auto" key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
