import logo from './logo.svg';
import './App.css';
import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './components/auth/AuthProvider';
import { RequireAuth } from './components/auth/RequiredAuth';
import LayoutPage from './components/LayoutPage/LayoutPage';
import LogIn from './components/Login/LogIn';
import Register from './components/Register/Register';
import Projects from './components/LayoutPage/pages/Projects/Projects';
import ProjectItem from './components/LayoutPage/pages/Projects/ProjectItem/ProjectItem';
import NotFound from './components/LayoutPage/pages/404/NotFound';
import Statistics from './components/LayoutPage/pages/Statistics/Statistics';
function App() {
	return (

		<div className="App" >
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/login" element={<LogIn />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<LayoutPage />}>
							<Route index element={<Projects />} />
							<Route path="/projects" element={<Projects />} />
							<Route path="/projects/:projectId" element={<ProjectItem />} />


							<Route
								path="statistics"
								element={
									<RequireAuth>
										<Statistics />
									</RequireAuth>
								} />
						</Route>

						<Route path="*" element={<NotFound />} />

					</Routes>
				</AuthProvider>
			</Router>
		</div>

	);
}

export default App;
