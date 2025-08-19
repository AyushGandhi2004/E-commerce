import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/nav";
import Home from "./Pages/Home/Home";
import Login from "./Pages/login/login";
import Register from "./Pages/Register/Register";

const App = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {/* <h2>E-commerce</h2> */}
      <Register />
      
    </div>
  );
}

export default App;