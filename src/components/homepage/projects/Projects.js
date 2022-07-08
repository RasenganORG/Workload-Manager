import { Breadcrumb, Layout, Col, Row, Card, Progress, Button, List} from 'antd';
import { useState, useContext, useEffect } from 'react';
import { Outlet, useLocation, Link, useOutletContext} from 'react-router-dom';

export default function Projects()   {
	const [currentPath, setCurrentPath] = useOutletContext();
	const [renderActiveProjects, setRenderActiveProjects] = useState(true)
	const [renderCompletedProjects, setRenderCompletedProjects] = useState(true)
	const path = useLocation().pathname;
	
	useEffect( () => {
		if(path !== "/projects") {
			setRenderActiveProjects(false)
			setRenderCompletedProjects(false)
		} else {
			setRenderActiveProjects(true)
			setRenderCompletedProjects(true)
		}
			setCurrentPath(path)
	})
 
    
	 
    


	const PlaceholderActiveProject = () => {
        const projectTasksData = [
            {
                title: "Upcoming tasks",
                taskNumber: 34,
            },
            {
                title: "Assigned tasks",
                taskNumber: 5,
            },
            {
                title: "Blocked tasks",
                taskNumber: 2,
            }
            
        ];
    
        const userData = [
            {
                userName: "Jane Doe",
            },
            {
                userName: "John Doe",
            }
        ];
        console.log(useLocation().pathname)

        return (
            <Col span={8}>
                <Card title={<Link to="project">Project 1</Link>} bordered={false}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    
                    <Row gutter={4}>
                        <Col span={12}>
                            <h3>Statistics</h3>
                            <List
                                itemLayout="horizontal"
                                dataSource={projectTasksData}
                                renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href="#">{item.title + ": " + item.taskNumber}</a>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12} style={{
													display: "flex",
													"align-items": "center",
													"justify-content": "center"
												}}>
                           <Progress type="circle" percent={Math.floor(Math.random() * 100)} /> 
                        </Col>
                    </Row>
                </Card>
                {/* todo: create componenets to render cards */}
            </Col>
        )
    }
	const PlaceholderCompletedProject = () => {
			const projectTasksData = [
					{
							title: "Upcoming tasks",
							taskNumber: 0,
					},
					{
							title: "Assigned tasks",
							taskNumber: 0,
					},
					{
							title: "Blocked tasks",
							taskNumber: 0,
					}
					
			];
	
			const userData = [
					{
							userName: "Jane Doe",
					},
					{
							userName: "John Doe",
					}
			];
			return (
					<Col span={8}>
							<Card title={'Project 1'} bordered={false}>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									 
 									<Row gutter={4}>
                        <Col span={12}>
                            <h3>Statistics</h3>
                            <List
                                itemLayout="horizontal"
                                dataSource={projectTasksData}
                                renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href="#">{item.title + ": " + item.taskNumber}</a>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12} style={{
													display: "flex",
													"align-items": "center",
													"justify-content": "center"
												}}>
                           <Progress type="circle" percent={100} /> 
                        </Col>
                    </Row>
							</Card>
							{/* todo: create componenets to render cards */}
					</Col>
			)
	}

	const getActiveProjects = (shouldRender) => {
		if(shouldRender) {
			return (
				<>
					<PlaceholderActiveProject />
					<PlaceholderActiveProject />
					<PlaceholderActiveProject />
					<PlaceholderActiveProject />
					<PlaceholderActiveProject />
 				</>
			)
		} else {
			return null
		}
	}
	const getCompletedProjects = (shouldRender) => {
		if(shouldRender) {
			return (
				<>
 					<PlaceholderCompletedProject />
					<PlaceholderCompletedProject />
					<PlaceholderCompletedProject />
					<PlaceholderCompletedProject />
					<PlaceholderCompletedProject />
					<PlaceholderCompletedProject />
 				</>
			)
		} else {
			return null
		}
	}
	const RenderProjects = () => {
		const breadcrumbs = () => {
			return (
				<Row justify='space-between' align='middle'>
					<Breadcrumb
					style={{
							margin: '16px 0 ',
					}}
					>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>Projects</Breadcrumb.Item>
					</Breadcrumb>

					<Button type="primary">
						<Link to="add-new-project">
							Add new project
						</Link>
					</Button>
				</Row>
			)
		}
		return (
			 <>
			
				{renderActiveProjects || renderCompletedProjects ? breadcrumbs(): ''}
				<Row gutter={[16,16]} >
					{getActiveProjects(renderActiveProjects)}
					{getCompletedProjects(renderCompletedProjects)}
				</Row>
			</>
		)
	}
	return (
		<Layout
		style={{
		padding: '0 24px 24px',
 		}}
		> 
				<RenderProjects />
						
						<Outlet />
			 
		</Layout>

	)
}