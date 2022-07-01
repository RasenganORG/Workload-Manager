import './App.scss';
import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/login/Login';
import Register from "./components/register/Register"
import Homepage from './components/homepage/Homepage'
import ActiveProjects from './components/homepage/activeProjects/activeProjects';
import CompletedProjects from './components/homepage/completedProjects/completedProjects';
import UserList from './components/homepage/userList/userList';
function App() {


  return (
     
      <div className="App">
         <Router>
          <Routes>
            
               
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/" element={<Homepage /> }> 
              <Route path="/" element={ <ActiveProjects/>} />
              <Route path="active-projects" element={ <ActiveProjects/>} />
              <Route path="completed-projects" element={ <CompletedProjects/>} />
              <Route path="user-list" element={ <UserList /> } />
            </Route>
          </Routes>
        </Router>
      </div>
    
  );
}

export default App;