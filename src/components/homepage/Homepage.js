import "./Homepage.scss"
import { SearchOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Input, Col, Row, Card, Progress, Avatar, List} from 'antd';
import React from 'react';
import Item from "antd/lib/list/Item";

export default function Homepage(){ 
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
        <div className="Homepage">
            <Layout>
                <Layout.Header className="Layout.Header">
                    <Row>
                        <Col span={3}>
                            <Input.Search
                                placeholder="Search project"
                                allowClear
                                enterButton={<SearchOutlined />}
                                size="large"
                                onSearch={alert}
                                style={{"padding-top": "1em", width:"100%"}}
                            />
                        </Col>  
                        <Col span={1}>
                            <div className="logo">logo</div>
                        </Col>
                        <Col span={20}> 
                            <Menu defaultSelectedKeys={["activeProjects"]}theme="dark" mode="horizontal">
                                <Menu.Item key="activeProjects">Active projects</Menu.Item>
                                <Menu.Item key="completedProjects">Completed projects</Menu.Item>
                                <Menu.Item key="userList">User List</Menu.Item>
                            </Menu>
                        </Col>
                        
                        </Row>
                </Layout.Header>
                <Layout>
                    <Row>
                        <Col span={4}>
                            <Layout.Sider width={"100%"} className="site-layout-background">
                                <Menu mode="inline"style={{height: '100%', borderRight: 0}}>
                                    <Menu.SubMenu title="Most Recent Projects">
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                    </Menu.SubMenu>

                                    <Menu.SubMenu title="All projects">
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                            </Layout.Sider>
                        </Col>
                        <Col span={18}>
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
                            <Layout.Content className="site-layout-background">

                                <Row gutter={[16,16]}>
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
                                    
                                </Row>
                            </Layout.Content>
                        </Layout>
                        </Col>
                    </Row>
                </Layout>
            </Layout>        
        </div>
    )
}