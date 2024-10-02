import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";
import Homepage from "./Components/Homepage";
import MovieDetail from "./Components/MovieDetail";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="details/:movieId" element={<MovieDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
