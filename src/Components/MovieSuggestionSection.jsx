import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";

const MovieSuggestionSection = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&page=1`,
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching similar movies:", error);
        setHasMore(false);
      }
      setLoading(false);
    };

    if (movieId) {
      fetchSimilarMovies();
    }
  }, [movieId]);

  return (
    <div className="w-[80%] mx-auto">
      <div className="">
        <div className="flex items-center gap-4 mb-6 lg:mb-0">
          <div>
            <h2 className="rev text-2xl sm:text-4xl font-bold text-[#e36414] w-fit border-b-4 mb-4 md:mb-0 border-blue-700 md:text-6xl">
              You Might Also Like
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-m">
              Discover movies similar to your current selection
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {movies.map((movie, index) => (
            <MovieCard className="mx-auto" key={index} movie={movie} />
          ))}
        </div>

        <div ref={loaderRef} className="h-10 mt-10 text-center">
          {loading && <p className="text-gray-500">Loading more...</p>}
          {!loading && !hasMore && (
            <p className="text-gray-400">No more movies.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSuggestionSection;
