import { Breadcrumb, Layout, Col, Row, Card, Progress, Avatar, List} from 'antd';

export default function ActiveProjects()   {
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
        return (
            <Col span={8}>
                <Card title={'Project 1'} bordered={false}>
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
       
    return (
        <Layout
            style={{
            padding: '0 24px 24px',
            }}
        >
            <Breadcrumb
            style={{
                margin: '16px 0',
            }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Active Projects</Breadcrumb.Item>
            </Breadcrumb>

            {/* main content start */}
            <Layout.Content className="site-layout-background">

                <Row gutter={[16,16]}>
                    <PlaceholderActiveProject />
                    <PlaceholderActiveProject />
                    <PlaceholderActiveProject />
                    <PlaceholderActiveProject />
                </Row>
            </Layout.Content>
        </Layout>

    )
}