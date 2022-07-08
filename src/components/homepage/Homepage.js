import "./Homepage.scss"
import { SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Input, Col, Row, Card, Progress, Avatar, List } from 'antd';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Siderbar from "./Sidebar";
export default function Homepage() {
	const [currentPath, setCurrentPath] = useState("/")
	const [sidebarColumns, setSiderbarColumns] = useState(4) //4 cols out of 24
	const [contentColumns, setContentColumns] = useState(20) //20 cols out of 20

	useEffect(() => {
		if (currentPath === "/projects" || currentPath === "/completed-projects" || currentPath === "/") {
			setSiderbarColumns(4);
			setContentColumns(20)
		} else {
			setSiderbarColumns(0);
			setContentColumns(24)
		}
	}, [currentPath])




	//when the router path is modified we remove/add the siderbar, depending on the path
	//each direct child of homepage(active-projects, completed-projects and user-list) has 
	//a function that updates the path using router context





	return (
		<div className="Homepage">
			<Layout>
				<Layout.Header className="Layout.Header">
					<Row>
						<Col span={3}>
							<Input.Search
								placeholder="Search project"
								allowClear
								enterButton={<SearchOutlined />}
								onSearch={console.log("searching...")}
								style={{ "padding": "1em 0", width: "100%" }}
							/>
						</Col>
						<Col span={1}>
							<div className="logo">
							</div>
						</Col>
						<Col span={20}>
							{/* <Menu defaultSelectedKeys={["activeProjects"]}theme="dark" mode="horizontal">
                                 
                                <Menu.Item key="activeProjects">
                                    <Link to="active-projects">
                                        Active projects
                                    </Link>    
                                </Menu.Item>
                                <Menu.Item key="completedProjects">
                                    <Link to="completed-projects">
                                        Completed projects
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="userList">
                                    <Link to="user-list">
                                        User List
                                    </Link>    
                                </Menu.Item>
                            </Menu> */}
							<Menu defaultSelectedKeys={["1"]} theme="dark" mode="horizontal">

								<Menu.Item key="1">
									<Link to="projects">
										Projects
									</Link>
								</Menu.Item>
								<Menu.Item key="2">
									<Link to="user-list">
										User List
									</Link>
								</Menu.Item>
								<Menu.Item key="3">
									<Link to="concedii">
										Concedii
									</Link>
								</Menu.Item>
								<Menu.Item key="4">
									<Link to="statistics">
										Stats
									</Link>
								</Menu.Item>
							</Menu>
						</Col>

					</Row>
				</Layout.Header>
				<Layout>
					<Row style={{ "max-width": "100%" }}>


						<Col span={sidebarColumns}>
							<Siderbar />
						</Col>
						<Col span={contentColumns}>
							<Outlet context={[currentPath, setCurrentPath]} />
							{/* reference for outlet > https://www.youtube.com/watch?v=PWi9V9d_Jsc */}
						</Col>
					</Row>
				</Layout>
			</Layout>
		</div>
	)
}