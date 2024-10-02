import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Homepage from "./Components/Homepage";
import MovieDetail from "./Components/MovieDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="details/:movieId" element={<MovieDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
