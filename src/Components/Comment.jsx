import React from "react";
export default function Comment({ comment }) {
  return (
    <div className="w-full py-4 border-solid border-b border-black">
      <div className="commentor flex h-[30px] md:h-[50px] ">
        {comment.author_details.avatar_path ? (
          <img
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full mr-2 md:mr-4"
            src={`https://image.tmdb.org/t/p/w200${comment.author_details.avatar_path}`}
            alt=""
          />
        ) : (
          <div className=" w-[30px] h-[30px] md:w-[50px] md:h-[50px] bg-green-700 text-lg md:text-2xl font-bold text-white rounded-full mr-2 md:mr-4 flex justify-center items-center">
            {comment.author.toUpperCase().slice(0, 1)}
          </div>
        )}

        <div className="author h-full flex items-center font-semibold justify-center">
          {comment.author}
        </div>
      </div>
      <div
        id="comment"
        dangerouslySetInnerHTML={{ __html: comment.content }}
        className="comment text-sm max-h-[150px] overflow-y-auto"
      ></div>
    </div>
  );
}
