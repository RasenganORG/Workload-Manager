import './App.scss';
import React from "react";
import "antd/dist/antd.css";
import Login from './components/login/Login';
import Register from "./components/register/Register"
import Homepage from './components/homepage/Homepage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {


  return (
     
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage /> }/>
               
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    
  );
}

export default App;