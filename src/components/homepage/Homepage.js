import "./Homepage.scss"
import { SearchOutlined } from '@ant-design/icons';
import { Layout, Menu, Input, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
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
	const menuItems = [
		{
			label: <Link to="projects">Projects</Link>,
			key: 'item-1'
		},
		{
			label: <Link to="user-list">User list</Link>,
			key: 'item-2'
		},
		{
			label: <Link to="concedii">Concedii</Link>,
			key: 'item-3'
		},
		{
			label: <Link to="statistics">Statistics</Link>,
			key: 'item-4'
		}
	]

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
							<Menu defaultSelectedKeys={["1"]} theme="dark" mode="horizontal" items={menuItems} />
						</Col>

					</Row>
				</Layout.Header>
				<Layout>
					<Row style={{ maxWidth: "100%" }}>


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