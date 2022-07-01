import logo from './logo.svg';
import './App.scss';
import React from "react";
import ReactDOM from "react-dom";
import { Button, DatePicker, Card } from "antd";
import "antd/dist/antd.css";
import Login from './components/login-page/Login';
import Homepage from './components/homepage/Homepage';

function App() {
  return (
    <div className="App">
      {/* form taken from here https://codesandbox.io/s/rx2qf?file=/index.js:1573-1604 */}
      {/* <Login></Login>   temporary commented out  until router is added*/}
      <Homepage />  
    </div>
  );
}

export default App;