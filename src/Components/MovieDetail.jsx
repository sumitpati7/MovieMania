import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie_detail, setMovieDetail] = useState({});
  const [review_comments, setReviewComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=` +
            process.env.REACT_APP_API_KEY,
          options
        );
        const movieData = await response.json();
        setMovieDetail(movieData);
      } catch (e) {}
    }
    fetchData();
  }, [movieId]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1&api_key=` +
        process.env.REACT_APP_API_KEY,
      options
    )
      .then((response) => response.json())
      .then((response) => setReviewComments(response.results))
      .catch((err) => console.error(err));
  }, [movieId]);

  const postReview = async () => {
    setIsLoading(true);
    try {
      console.log(isLoading);

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            accept: "application/json",
            RAW_BODY: JSON.stringify({ rating: 4 }),
          },
        }
      );
      const message = await response.json();
      console.log(message);
    } catch (e) {}
  };

  // useEffect(async function postReview() {
  //   let value = document.getElementById("rating-select").target.value;
  //   console.log(value);

  //   const post = await fetch(
  //     `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         "Content-Type": "application/json;charset=utf-8",
  //         api_key: process.env.REACT_APP_API_KEY,
  //       },
  //       body: JSON.stringify({ value: 4 }),
  //     }
  //   );
  //   const response = await response.json();
  //   console.log(response);
  // });

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto">
        <div className="img w-full h-[75vh] relative">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie_detail.backdrop_path}`}
            alt="movie backdrop"
            className="w-full h-full blur-md"
          />
          <div className="absolute w-full px-16 bottom-16 md:flex flex-col md:max-h-[400px] md:flex-row">
            <img
              className="mx-auto w-4/5 h-4/5 md:h-full md:w-full max-h-[400px] max-w-[265px] md:mx-0"
              src={`https://image.tmdb.org/t/p/w200${movie_detail.poster_path}`}
              alt=""
            />
            <div className="description pl-16 hidden md:inline">
              <a
                href={movie_detail.homepage}
                target="_blank"
                rel="noreferrer"
                className="text-4xl xl:text-6xl mb-8 text-[#88C0D0] font-semibold font-[Poppins]"
              >
                {movie_detail.title}
              </a>{" "}
              <br />
              <div className=" text-xl lg:text-2xl text-[#88C0D0] my-2 font-medium">
                {movie_detail.tagline}
              </div>
              <br />
              <p className="text-[#88C0D0] text-sm lg:text-md w-4/5 text-md">
                {movie_detail.overview}
              </p>
              <table className="w-1/2 text-[#88C0D0] text-left mt-4">
                <thead></thead>
                <tbody>
                  <tr>
                    <th>Vote Count</th>
                    <td>{movie_detail.vote_count}</td>
                  </tr>
                  <tr className="mt-4">
                    <th>Vote Rating</th>
                    <td>{movie_detail.vote_average}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="buttons flex flex-col justify-center items-center min-w-max">
              <a
                href={movie_detail.homepage}
                className="p-4 text-center text-[#88C0D0] border-2 border-[#88C0D0] m-2 w-full rounded-lg"
              >
                Watch Trailer
              </a>
              <a
                href={movie_detail.homepage}
                className="p-4 text-center text-[#88C0D0] border-2 border-[#88C0D0] m-2 w-full rounded-lg"
              >
                Watch Movie Now
              </a>
            </div>
          </div>
        </div>
        <div className="border-b border-solid mb-4 border-gray-50 flex flex-col md:justify-between w-[80%] mt-8 mx-auto text-black">
          <div className="desc text-4xl font-bold text-[#e36414] md:mb-0 w-fit border-b-4 mb-4 border-blue-700 md:text-6xl">
            Description
          </div>
          <div className="description py-8 border-black border-b-2 border-dotted md:hidden">
            <a
              href={movie_detail.homepage}
              target="_blank"
              rel="noreferrer"
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
              <tbody>
                <tr>
                  <th>Vote Count</th>
                  <td>{movie_detail.vote_count}</td>
                </tr>
                <tr className="mt-4">
                  <th>Vote Rating</th>
                  <td>{movie_detail.vote_average}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-8 border-b-2 border-dotted border-black">
            <table className="text-left w-1/2">
              <thead>
                <tr>
                  <th className="text-center" colSpan={2}>
                    About Movie
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Runtime:</th>
                  <td>{movie_detail.runtime} min</td>
                </tr>
                <tr>
                  <th>Language:</th>
                  <td className="uppercase">
                    {movie_detail.original_language}
                  </td>
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
              </tbody>
            </table>
          </div>
        </div>
        <div className="reviews w-[80%] py-8 mx-auto">
          <div className="rev text-4xl font-bold text-[#e36414] w-fit border-b-4 mb-4 md:mb-0 border-blue-700 md:text-6xl">
            Reviews
          </div>
          <div>
            {review_comments.map((value, index) => (
              <Comment key={index} comment={value} />
            ))}
          </div>
        </div>
        <div className="rating w-[80%] py-8 mx-auto">
          <div className="rev text-4xl font-bold text-[#e36414] w-fit border-b-4 mb-4 md:mb-0 border-blue-700 md:text-6xl">
            Rating
          </div>
          <div className="rate-box w-full">
            <div className="text-xl">Would you like to rate this movie?</div>
            <div className="rating-select w-full flex justify-center">
              <select
                className=" border-[#88C0D0] border-solid border"
                name="rating"
                id="rating-select"
              >
                <option disabled value={null}>
                  --Select--
                </option>
                {[1, 2, 3, 4, 5].map((value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
              <button
                onClick={postReview}
                className="ml-4 border-[#88C0D0] border-solid border px-4 rounded-sm"
              >
                Rate!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
