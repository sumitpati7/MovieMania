import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, addMovies, selectMovies } from "../redux/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const MovieList = () => {
  const [page, setPage] = useState(1);
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

  const [filter, setFilter] = useState("now_playing");
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=" +
        page +
        "&api_key=" +
        process.env.REACT_APP_API_KEY,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(fetchMovies(response.results));
      })
      .catch((err) => console.error(err));
    setPage(parseInt(page) + 1);
  }, [dispatch, setPage]);

  const fetchData = useCallback(
    (filter) => {
      setFilter(filter);
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          filter +
          "?language=en-US&page=" +
          1 +
          "&api_key=" +
          process.env.REACT_APP_API_KEY,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          dispatch(fetchMovies(response.results));
          setPage(2);
        })
        .catch((err) => console.error(err));
    },
    [dispatch]
  );

  const fetchMore = useCallback(() => {
    console.log(page);
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        filter +
        "?language=en-US&page=" +
        page +
        "&api_key=" +
        process.env.REACT_APP_API_KEY,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(addMovies(response.results));
        setPage(parseInt(page) + 1);
      })
      .catch((err) => console.error(err));
  }, [dispatch, filter, page]);

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
      <div className="grid w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {movies.map((value, index) => (
          <MovieCard className="mx-auto" key={index} movie={value} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={(e) => {
            console.log(page);
            setPage(parseInt(page) + 1);
            console.log(page);
            fetchMore();
          }}
        >
          See More <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
