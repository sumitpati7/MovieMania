import React, { useCallback, useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, appendMovies, selectMovies } from "../redux/movieSlice";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const apiKey = process.env.REACT_APP_API_KEY;

  const loaderRef = useRef(null);

  const fetchData = useCallback(
    async (category, pageNum = 1, append = false) => {
      if (!apiKey) {
        console.error("API key is missing.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${pageNum}&api_key=${apiKey}`,
          options,
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          if (append) {
            dispatch(appendMovies(data.results));
          } else {
            dispatch(fetchMovies(data.results));
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [apiKey, dispatch],
  );

  // Fetch on filter change (reset list)
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchData(filter, 1, false);
  }, [filter, fetchData]);

  // Fetch more on page change
  useEffect(() => {
    if (page !== 1) {
      fetchData(filter, page, true);
    }
  }, [page, filter, fetchData]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "100px",
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  return (
    <div className="w-full relative">
      {/* Fixed filter dropdown */}
      <div className="sticky top-[56px] left-0 right-0 z-20">
        <div className="w-[90%] mx-auto">
          <div className="text-xl font-semibold text-blue-700 w-full bg-white bg-opacity-45">
            <select
              name="filter"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent mt-2"
            >
              {filter_type.map((value, index) => (
                <option
                  key={index}
                  value={value.url_snip}
                  className={"bg-transparent"}
                >
                  {value.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Padding to offset fixed filter height */}
      <div className="pt-4 w-[90%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {movies.map((movie, index) => (
            <MovieCard className="mx-auto" key={index} movie={movie} />
          ))}
        </div>

        <div ref={loaderRef} className="h-10 mt-10 text-center">
          {loading && <p className="text-gray-500">Loading more...</p>}
          {!hasMore && <p className="text-gray-400">No more movies.</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
