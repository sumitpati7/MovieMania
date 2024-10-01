import React from "react";
import movie1 from "../assets/img/movie1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPlay } from "@fortawesome/free-solid-svg-icons";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`details/${movie.id}`);
  };

  const changeDisplayShow = () => {
    const play = document.getElementById(movie.id);
    play.style.display = "inline";
    play.style.background = "rgba(0,0,0,0.7)";
  };

  const changeDisplayHidden = () => {
    const play = document.getElementById(movie.id);
    play.style.display = "none";
  };

  return (
    <>
      <div className="movie w-[250px] md:w-[300px] mx-auto float-left pr-3 mt-4">
        <div
          onMouseEnter={changeDisplayShow}
          onMouseLeave={changeDisplayHidden}
          onClick={navigateToDetails}
          className="movie-image float-left w-[250px] md:w-[300px] h-[450px] relative"
        >
          {" "}
          <span
            id={movie.id}
            className="play absolute w-[250px] p-4 md:w-[300px] h-[450px] block z-[5] cursor-pointer hidden left-0 top-0 overflow-y-auto"
          >
            <span className="text-sm text-white">
              Description: {movie.overview} <br />
              Release Date: {movie.release_date}
            </span>
          </span>{" "}
          <a
            className="float-left inline w-[250px] md:w-[300px] h-[450px] relative z-[2]"
            href="#"
          >
            <img
              className="w-[250px] md:w-[300px] h-[450px]"
              src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
              alt=""
            />
          </a>{" "}
        </div>
        <div className="rating float-left w-full text-[12px]">
          <div className="w-full pt-2 text-sm font-semibold font-[poppins]">
            {movie.title}
          </div>
          <p className="float-left  text-black font-[bold]">RATING</p>
          <div className="stars float-left h-full flex items-center ml-0.5">
            <StarRating rating={Math.floor((movie.vote_average / 10) * 5)} />
          </div>
          <span className="comments float-right pl-3">
            <FontAwesomeIcon className="" icon={faComment} />
            {movie.vote_count}
          </span>{" "}
        </div>
      </div>
    </>
  );
};

export default MovieCard;
