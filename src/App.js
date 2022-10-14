import './App.css';
import React from "react";
// import "antd/dist/antd.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LayoutPage from './components/LayoutPage/LayoutPage';
// import LogIn from './components/Login/LogIn';
// import Register from './components/Register/Register';
// import Projects from './components/LayoutPage/pages/Projects/Projects';
// import ProjectItem from './components/LayoutPage/pages/Projects/ProjectItem/ProjectItem';
// import NotFound from './components/LayoutPage/pages/404/NotFound';
// import Statistics from './components/LayoutPage/pages/Statistics/Statistics';
// import UserList from './components/LayoutPage/pages/UserList/UserList';
// import NewProject from './components/LayoutPage/pages/Projects/NewProject/NewProject';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import PrivateRoute from './features/auth/PrivateRoute';
// import { Navigate } from 'react-router-dom';
// import AboutProject from './components/LayoutPage/pages/Projects/ProjectItem/itemComponents/aboutProject';
// import ProjectStatistics from './components/LayoutPage/pages/Projects/ProjectItem/itemComponents/projectStatistics';
// import NewTask from './components/LayoutPage/pages/Projects/ProjectItem/itemComponents/tasks/newTask';
// import Tasks from './components/LayoutPage/pages/Projects/ProjectItem/itemComponents/tasks/tasks';
// import Task from './components/LayoutPage/pages/Projects/ProjectItem/itemComponents/tasks/task';
// import EditProject from './components/LayoutPage/pages/Projects/ProjectItem/itemComponents/editProject';
// import LoggedTime from './components/LayoutPage/pages/Projects/LoggedTime';

// function App() {
//   return (

//     <div className="App" >
//       <Router>
//         <Routes>
//           <Route path="/" element={<LayoutPage />}>
//             <Route index element={<Navigate to='projects' />} />
//             <Route path="/projects" element={<Projects />} />
//             <Route path="/projects/add-project" element={<NewProject />} />
//             <Route path="/projects/:projectId" element={<ProjectItem />}>
//               <Route path="" index element={<Navigate to='tasks' />} />
//               <Route path="about" element={<AboutProject />} />
//               <Route path="add-task" element={<NewTask />} />
//               <Route path="statistics" element={<ProjectStatistics />} />
//               <Route path="time-log" element={<LoggedTime />} />

//               <Route path="tasks" element={<Tasks />} />
//               <Route path="tasks/:taskId" element={<Task />} />
//               <Route path="tasks/:taskId/time-log" element={<LoggedTime />} />
//               <Route path="edit-project" element={<EditProject />} />


//             </Route>

//             <Route
//               path="statistics"
//               element={
//                 <PrivateRoute>
//                   <Statistics />
//                 </PrivateRoute>
//               } />
//             <Route
//               path="user-list"
//               element={
//                 <PrivateRoute>
//                   <UserList />
//                 </PrivateRoute>
//               } />
//           </Route>

//           <Route path="/login" element={<LogIn />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//       <ToastContainer />
//     </div>

//   );
// }

// export default App;



function App() {

  return (
    <div className='App'>
      <h1>This is the container</h1>
    </div>
  )
}

export default App