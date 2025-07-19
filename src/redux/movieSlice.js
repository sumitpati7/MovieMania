// redux/movieSlice.js

import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    fetchMovies: (state, action) => {
      // Replace movie list (e.g., on filter change)
      return action.payload;
    },
    appendMovies: (state, action) => {
      // Append to existing list
      return [...state, ...action.payload];
    },
  },
});

export const { fetchMovies, appendMovies } = movieSlice.actions;

export const selectMovies = (state) => state.movies;

export default movieSlice.reducer;
