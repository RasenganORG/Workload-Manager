import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { Button, DatePicker, Card } from "antd";
import "antd/dist/antd.css";
import Login from './components/login-page/Login';
import "./assets/variables.scss"


function App() {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;