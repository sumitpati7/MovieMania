import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, setReviews } from "../redux/movieDetailSlice";

export default function CommentForm() {
  const [username_value, setUserNameValue] = useState("");
  const [text_area, setTextArea] = useState("");
  const [rating_select, setRatingSelect] = useState("");
  const dispatch = useDispatch();
  const review_comments = useSelector(getReviews);

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
  };

  const addToForm = (e) => {
    setUserNameValue(e.target.value);
  };

  const updateRating = (e) => {
    setRatingSelect(e.target.value);
  };

  const resetForm = () => {
    setRatingSelect(1);
    setTextArea("");
    setUserNameValue("");
  };

  const submitForm = (e) => {
    e.preventDefault();
    let formData = {
      author: username_value,
      content: text_area,
      created_at: new Date().toString(),
      author_details: {
        avatar_path: null,
        name: "",
        rating: rating_select,
        username: username_value,
      },
    };
    dispatch(setReviews([...review_comments, formData]));
    resetForm();
  };

  return (
    <div className=" w-full p-4 bg-transparent shadow-xl rounded-[25px]">
      <form className="my-2" onSubmit={submitForm}>
        <textarea
          placeholder="What do you think of this movie?"
          rows={5}
          className="w-full rounded-[15px] p-4 focus:border-none bg-gray-200"
          name="content"
          value={text_area}
          onChange={handleTextAreaChange}
          required
          id="content"
        ></textarea>
        <div className="flex justify-center align-center h-[45px] mt-4 gap-[4px]">
          <input
            placeholder="Username"
            className="w-1/2 h-full rounded-[5px] p-2 focus:border-none bg-gray-200"
            type="text"
            value={username_value || ""}
            name="username"
            required
            id="username"
            onChange={addToForm}
          />
          <select
            className=" w-1/2 h-full rounded-[5px] p-2 focus:border-none bg-gray-200 "
            name="rating"
            id="rating-select"
            value={rating_select}
            required
            onChange={updateRating}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="button h-[45px] mt-4 flex justify-end items-center">
          <input
            className="p-2 rounded-[10px] bg-gray-200"
            type="submit"
            value={"Submit"}
          />
        </div>
      </form>
    </div>
  );
}
