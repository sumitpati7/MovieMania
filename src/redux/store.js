import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import movieDetailSlice from "./movieDetailSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetail: movieDetailSlice,
  },
});

export default store;
