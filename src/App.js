import "./App.css";
import Navbar from "./Components/navbar";
import Homepage from "./Components/Homepage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
