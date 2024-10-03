import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    fetchMovies: (state, actions) => {
      state.movies = actions.payload;
    },
    addMovies: (state, actions) => {
      actions.payload.forEach((element) => {
        state.movies.push(element);
      });
    },
  },
});

export const { fetchMovies, addMovies } = movieSlice.actions;
export const selectMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
