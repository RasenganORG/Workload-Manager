import "./Homepage.scss"
import { SearchOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Input, Col, Row, Card, Progress, Avatar, List} from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

export default function Homepage(){ 

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
                                style={{"padding": "1em 0" , width:"100%"}}
                            />
                        </Col>  
                        <Col span={1}>
                            <div className="logo">logo</div>
                        </Col>
                        <Col span={20}> 
                            <Menu defaultSelectedKeys={["activeProjects"]}theme="dark" mode="horizontal">
                                 
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
                            <Outlet /> 
                            {/* reference for outlet > https://www.youtube.com/watch?v=PWi9V9d_Jsc */}
                        </Col>
                    </Row>
                </Layout>
            </Layout>        
        </div>
    )
}