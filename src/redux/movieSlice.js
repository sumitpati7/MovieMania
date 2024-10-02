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
  },
});

export const { fetchMovies } = movieSlice.actions;
export const selectMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
