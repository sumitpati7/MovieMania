import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectMovies } from "../redux/movieSlice";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const Searchsection = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);

  const [keyword, setKeyword] = useState("");

  const searchMovie = useCallback(async () => {
    if (!apiKey) {
      console.error("Missing API Key");
      return;
    }

    if (!keyword.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
          keyword,
        )}&api_key=${apiKey}`,
        options,
      );
      const data = await res.json();
      dispatch(fetchMovies(data.results || []));
    } catch (err) {
      console.error(`Error fetching movies with keyword "${keyword}":`, err);
    }
  }, [keyword, apiKey, dispatch]);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
        placeholder="Search your movies..."
      />
      <button
        className="absolute md:right-5 top-3 right-3"
        type="button"
        onClick={searchMovie}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Searchsection;
