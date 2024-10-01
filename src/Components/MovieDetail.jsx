import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chip from "./Chip";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie_detail, setMovieDetail] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=` +
        process.env.REACT_APP_API_KEY,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieDetail(response))
      .catch((err) => console.error(err));
  }, [options]);

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto">
        <div className="img w-full h-[75vh] relative">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie_detail.backdrop_path}`}
            alt="movie backdrop"
            className="w-full h-full blur-md"
          />
          <div className="absolute w-full px-16 bottom-16 md:flex flex-col md:flex-row">
            <img
              className="mx-auto md:mx-0"
              src={`https://image.tmdb.org/t/p/w200${movie_detail.poster_path}`}
              alt=""
            />
            <div className="description pl-16 hidden md:inline">
              <a
                href={movie_detail.homepage}
                target="_blank"
                className="text-6xl mb-8 text-[#88C0D0] font-semibold font-[Poppins]"
              >
                {movie_detail.title}
              </a>{" "}
              <br />
              <div className="text-2xl text-[#88C0D0] my-2 font-medium">
                {movie_detail.tagline}
              </div>
              <br />
              <p className="text-[#88C0D0] w-4/5 text-md">
                {movie_detail.overview}
              </p>
              <table className="w-1/2 text-[#88C0D0] text-left mt-4">
                <tr>
                  <th>Vote Count</th>
                  <td>{movie_detail.vote_count}</td>
                </tr>
                <tr className="mt-4">
                  <th>Vote Rating</th>
                  <td>{movie_detail.vote_average}</td>
                </tr>
              </table>
            </div>
            <div className="buttons flex flex-col justify-center items-center min-w-max">
              <button className="p-4 text-[#88C0D0] border-2 border-[#88C0D0] m-2 w-full rounded-lg">
                Watch Trailer
              </button>
              <button className="p-4 text-[#88C0D0] border-2 border-[#88C0D0] m-2 w-full rounded-lg">
                Watch Movie Now
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-solid mb-4 border-gray-50 flex flex-row md: flex-col md:justify-between w-[80%] mt-8 mx-auto text-black">
          <div className="description md:hidden">
            <a
              href={movie_detail.homepage}
              target="_blank"
              className=" text-3xl md:text-6xl mb-8 text-black font-semibold font-[Poppins]"
            >
              {movie_detail.title}
            </a>{" "}
            <br />
            <div className="text-md md:text-2xl text-black my-2 font-medium">
              {movie_detail.tagline}
            </div>
            <br />
            <p className="text-black w-full text-sm md:text-md">
              {movie_detail.overview}
            </p>
            <table className="w-1/2 text-black text-left mt-4">
              <tr>
                <th>Vote Count</th>
                <td>{movie_detail.vote_count}</td>
              </tr>
              <tr className="mt-4">
                <th>Vote Rating</th>
                <td>{movie_detail.vote_average}</td>
              </tr>
            </table>
          </div>
          <table className="text-left w-1/2">
            <tr>
              <th>Runtime:</th>
              <td>{movie_detail.runtime} min</td>
            </tr>
            <tr>
              <th>Language:</th>
              <td className="uppercase">{movie_detail.original_language}</td>
            </tr>
            <tr>
              <th>Revenue:</th>
              <td>{movie_detail.revenue}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>{movie_detail.status}</td>
            </tr>
            <tr>
              <th>Release Date:</th>
              <td>{movie_detail.release_date}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
