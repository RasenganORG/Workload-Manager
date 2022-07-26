import { SearchOutlined } from '@ant-design/icons';
import { Layout, Menu, Input, Col, Row } from 'antd';
import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from '../auth/AuthStatus';
export default function LayoutPage() {

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

	const authItems = [
		{
			label: <Link to="login">Login</Link>,
			key: 'item-1'
		},
		{
			label: <Link to="register">Register</Link>,
			key: 'item-2'
		},
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
						<Col span={16}>
							<Menu defaultSelectedKeys={["1"]} theme="dark" mode="horizontal" items={menuItems} />
						</Col>

						<Col span={4}>
							<Menu defaultSelectedKeys={["1"]} theme="dark" mode="horizontal" items={authItems} />
						</Col>

						
					</Row>
				</Layout.Header>
				<Layout>
					<Row style={{ maxWidth: "100%" }}>

						<AuthStatus />


						<Col span={4}>
							{/* <Siderbar /> */}
						</Col>
						<Col span={20}>
							<Outlet />
							{/* reference for outlet > https://www.youtube.com/watch?v=PWi9V9d_Jsc */}
						</Col>
					</Row>
				</Layout>
			</Layout>
		</div>
	)
}