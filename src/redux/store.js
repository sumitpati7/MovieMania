import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import movieDetailReducer from "./movieDetailSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetail: movieDetailReducer,
  },
});

export default store;
