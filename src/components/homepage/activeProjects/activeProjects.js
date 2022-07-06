import { Breadcrumb, Layout, Col, Row, Card, Progress, Avatar, List} from 'antd';
import { useContext, useEffect } from 'react';
import { Outlet, useLocation, Link, useOutletContext} from 'react-router-dom';

export default function ActiveProjects()   {
    const [currentPath, setCurrentPath] = useOutletContext();

    const GetPath = () => useLocation().pathname
    useEffect( () => {
        setCurrentPath(GetPath)
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
                        <Col span={20}>
                        <Progress percent={53} /> 
                        </Col>
                        <Col span={4}>
                            <p>completed</p>
                        </Col> 
                    </Row>
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
                        <Col span={12}>
                            <h3>Assigned users</h3 >
                            <List
                                itemLayout="horizontal"
                                dataSource={userData}
                                renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={<a href="#">{item.userName}</a>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Card>
                {/* todo: create componenets to render cards */}
            </Col>
        )
    }
    const RenderActiveProjects = (shouldRender) => {
        //we remove the rendered project if the path goes further than activeprojects, for eg, we go to active-projects/project and we only the individual obj 
        if(shouldRender.pathname === '/active-projects' || shouldRender.pathname === '/active-projects/' || shouldRender.pathname === '/') {
            return (
                <Layout
                style={{
                padding: '0 24px 24px',
                }}
                >
                    <Breadcrumb
                    style={{
                        margin: '16px 0 ',
                    }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Active Projects</Breadcrumb.Item>
                    </Breadcrumb>

                    <Row gutter={[16,16]}>
                        <PlaceholderActiveProject />
                        <PlaceholderActiveProject />
                        <PlaceholderActiveProject />
                        <PlaceholderActiveProject />
                        <PlaceholderActiveProject />
                    </Row>
                </Layout>
            )
        } else {
            return null
        }
       
    } 
    return (
        <Layout>
         {RenderActiveProjects(useLocation())}
                <Outlet />
        </Layout>

    )
}