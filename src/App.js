import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/navbar";
import Homepage from "./Components/Homepage";
import MovieDetail from "./Components/MovieDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "details/:movieId",
    element: <MovieDetail />,
  },
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
