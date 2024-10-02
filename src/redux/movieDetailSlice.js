import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviedetail: {},
  reviews: [],
};

const movieDetailSlice = createSlice({
  name: "moviedetail",
  initialState: initialState,
  reducers: {
    setMovieDetail: (state, actions) => {
      state.moviedetail = actions.payload;
    },
    setReviews: (state, actions) => {
      state.reviews = actions.payload;
    },
  },
});

export const { setMovieDetail, setReviews } = movieDetailSlice.actions;
export const getMovieDetail = (state) => state.movieDetail.moviedetail;
export const getReviews = (state) => state.movieDetail.reviews;
export default movieDetailSlice.reducer;
