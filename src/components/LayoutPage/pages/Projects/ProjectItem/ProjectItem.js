import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { reset, getProject } from '../../../../../features/projects/projectsSlice';
import Spinner from '../../../../Spinner';
import { Layout, Menu, Row, PageHeader, Col, Button, Breadcrumb } from 'antd';
import { Outlet, Link } from "react-router-dom";

export default function ProjectItem() {
	const currentPath = useLocation().pathname
	const dispatch = useDispatch()
	//the currenct path returns /projects/id, we're using currentPath.replace to remove "/projects/"
	//so that we can use the id to fetch an individual project
	const projectId = currentPath.replace('/projects/', '')
	const { currentProject, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.projects
	)

	useEffect(() => {
 		dispatch(getProject(projectId))
	}, [])


 
	console.log(projectId)
	if (isLoading) {
		return <Spinner />
	}
	if (currentProject == null) {
		return <>Error loading project</>
	}
	return (
		<div className="ProjectWrapper">
			<Layout
				style={{
					padding: '0 24px 24px',
				}}
			>
				<Breadcrumb
					style={{
						margin: '16px 0 0',
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>Active Projects</Breadcrumb.Item>
					<Breadcrumb.Item>{currentProject.title}</Breadcrumb.Item>
				</Breadcrumb>
				<Layout>

					<Layout.Content>
						<Row justify="space-between" align="middle">
							<PageHeader className="site-page-header" title={currentProject.title} subTitle={"Last updated: " + "2 hours ago"} />

							<Button type="primary" style={{ margin: "16px", display: "flex" }}>
								<Link to="add-task">
									Add new task
								</Link>
							</Button>
						</Row>

						<Row>
							<Menu mode="horizontal" style={{ flex: "auto" }} defaultSelectedKeys="tasks">
								<Menu.Item key="tasks"><Link to="tasks">Tasks</Link></Menu.Item>
								<Menu.Item key="about"><Link to="about">About</Link></Menu.Item>
								<Menu.Item key="statistics"><Link to="statistics">Project statistics</Link></Menu.Item>
							</Menu>
						</Row>
						<Row className="projectContent">
							<Outlet context={{currentProject}}/>
						</Row>
					</Layout.Content>
				</Layout>
			</Layout>

		</div>

	)
}
