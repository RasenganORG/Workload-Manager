import './App.scss';
import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/Login';
import Register from "./components/register/Register";
import Projects from './components/homepage/projects/Projects';
import Homepage from './components/homepage/Homepage';
import UserList from './components/homepage/userList/userList';
import Project from './components/homepage/projectPage/Project';
import Tasks from './components/homepage/projectPage/tasks/tasks';
import AboutProject from './components/homepage/projectPage/about/AboutProject';
import Projectstatistics from "./components/homepage/projectPage/projectStatistics/ProjectStatistics";
import NewTask from './components/homepage/projectPage/NewTaskPage/NewTasks';
import Concedii from './components/homepage/concedii/Concedii';
import Statistics from './components/homepage/statistics/Statistics';
import VacationCalendar from './components/homepage/concedii/calendar/Calendar';
import Wiki from './components/homepage/concedii/wiki/Wiki';
import NewProject from './components/homepage/projects/newProject/NewProject';
import IndividualTask from './components/homepage/projectPage/tasks/IndividualTask/IndividualTask';
function App() {

	return (

		<div className="App" >
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Homepage />}>
						<Route path="/" element={<Navigate to="projects" />} />
						<Route path="/projects" element={<Projects />}>
							<Route path="add-new-project" element={<NewProject s />} />
							<Route path="project" element={<Project />}>
								<Route path="" element={<Navigate to="tasks" />} />
								<Route path="tasks">
									<Route index element={<Tasks />} />
									<Route path="individual-task" element={<IndividualTask />} />
								</Route>
								<Route path="about" element={<AboutProject />} />
								<Route path="statistics" element={<Projectstatistics />} />
								<Route path="newtask" element={<NewTask />} />
							</Route>
						</Route>

						<Route path="user-list" element={<UserList />} />
						<Route path="concedii" element={<Concedii />}>
							<Route path="" element={<Navigate to="calendar" />} />
							<Route path="calendar" element={<VacationCalendar />} />
							<Route path="wiki" element={<Wiki />} />
						</Route>
						<Route path="statistics" element={<Statistics />} />
					</Route>

				</Routes>
			</Router>
		</div>

	);
}

export default App;