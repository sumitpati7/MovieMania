import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./Components/Homepage";
import MovieDetail from "./Components/MovieDetail";
import Navbar from "./Components/navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="details/:movieId" element={<MovieDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
